const express = require("express");
const http = require("http");
const Bowser = require("bowser");
const morgan = require("morgan");
const { postgraphile } = require("postgraphile");
const postgraphileOptions = require("./postgraphile/postgraphileOptions");
const authenticationPgSettings = require("./postgraphile/authenticationPgSettings");
const {
  generateDatabaseMockOptions,
} = require("./helpers/databaseMockPgOptions");
const nextjs = require("next");
const port = Number.parseInt(process.env.PORT, 10) || 3004;
const dev = process.env.NODE_ENV !== "production";
const app = nextjs({ dev });
const handle = app.getRequestHandler();
const bodyParser = require("body-parser");
const cors = require("cors");
const UNSUPPORTED_BROWSERS = require("../data/unsupported-browsers");
const { run } = require("graphile-worker");
const path = require("path");
const redirectRouter = require("./redirects");
const cookieParser = require("cookie-parser");
const { pgPool } = require("./db/databaseConnectionService");
const { createLightship } = require("lightship");
const delay = require("delay");
const session = require("./middleware/session");
const ssoMiddleware = require("./middleware/sso");

const NO_MAIL = process.argv.includes("NO_MAIL");

if (NO_MAIL) process.env.NO_MAIL = true;

// Graphile-worker function
async function worker() {
  // Run a worker to execute jobs:
  const runner = await run({
    pgPool,
    concurrency: 5,
    pollInterval: 1000,
    noHandleSignals: true,
    taskDirectory: path.resolve(__dirname, "tasks"),
  });

  const sigtermHandler = async () => {
    try {
      await runner.stop();
    } finally {
      process.removeListener("SIGTERM", sigtermHandler);
    }
  };

  process.addListener("SIGTERM", sigtermHandler);
}

// Start graphile-worker
worker().catch((error) => {
  if (error) {
    throw error;
  }
});

app.prepare().then(async () => {
  const server = express();

  // nginx proxy is running in the same pod
  server.set("trust proxy", "loopback");

  const lightship = createLightship();

  lightship.registerShutdownHandler(async () => {
    await delay(10000);
    await new Promise((resolve) => {
      server.close(() => pgPool.end(resolve));
    });
  });

  server.use(morgan("combined"));

  server.use(redirectRouter);

  server.use(bodyParser.json({ limit: "50mb" }));

  // Only allow CORS for the <Analytics /> component
  server.use(cors({ origin: "https://www2.gov.bc.ca" }));

  // Tell search + crawlers not to index non-production environments:
  server.use(({ res, next }) => {
    if (!process.env.NAMESPACE || !process.env.NAMESPACE.endsWith("-prod")) {
      res.append("X-Robots-Tag", "noindex, noimageindex, nofollow, noarchive");
    }
    next();
  });

  // Renders a static info page on unsupported browsers.
  // Files in /static/ are excluded.
  server.use("/", (req, res, next) => {
    if (req.path.startsWith("/static/")) return next();

    const browser = Bowser.getParser(req.get("User-Agent"));
    const isUnsupported = browser.satisfies(UNSUPPORTED_BROWSERS);
    if (isUnsupported) res.redirect("/static/update-browser.html");
    else next();
  });

  const { middleware: sessionMiddleware } = session();
  server.use(sessionMiddleware);
  server.use(await ssoMiddleware());

  server.use(cookieParser());

  server.use(
    postgraphile(pgPool, process.env.DATABASE_SCHEMA || "ggircs_portal", {
      ...postgraphileOptions(),
      graphileBuildOptions: {
        connectionFilterAllowNullInput: true,
        connectionFilterRelations: true,
      },
      pgSettings: (req) => {
        const opts = {
          ...authenticationPgSettings(req),
          ...generateDatabaseMockOptions(req.cookies, [
            "mocks.mocked_timestamp",
          ]),
        };
        return opts;
      },
    })
  );

  server.get("*", async (req, res) => {
    return handle(req, res);
  });

  const handleError = (err) => {
    console.error(err);
    lightship.shutdown();
  };

  http
    .createServer(server)
    .listen(port, (err) => {
      if (err) {
        handleError(err);
        return;
      }

      lightship.signalReady();
      console.log(`> Ready on http://localhost:${port}`);
    })
    .on("error", handleError);
});
