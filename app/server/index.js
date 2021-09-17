const express = require('express');
const http = require('http');
const Bowser = require('bowser');
const morgan = require('morgan');
const {postgraphile} = require('postgraphile');
const postgraphileOptions = require('./postgraphile/postgraphileOptions');
const authenticationPgSettings = require('./postgraphile/authenticationPgSettings');
const {
  generateDatabaseMockOptions
} = require('./helpers/databaseMockPgOptions');
const nextjs = require('next');
const crypto = require('crypto');
const port = Number.parseInt(process.env.PORT, 10) || 3004;
const dev = process.env.NODE_ENV !== 'production';
const app = nextjs({dev});
const handle = app.getRequestHandler();
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const bodyParser = require('body-parser');
const Keycloak = require('keycloak-connect');
const cors = require('cors');
const voyagerMiddleware = require('graphql-voyager/middleware').express;
const {getUserGroupLandingRoute} = require('../lib/user-groups');
const {getUserGroups} = require('./helpers/userGroupAuthentication');
const UNSUPPORTED_BROWSERS = require('../data/unsupported-browsers');
const {run} = require('graphile-worker');
const path = require('path');
const namespaceMap = require('../data/kc-namespace-map');
const redirectRouter = require('./redirects');
const cookieParser = require('cookie-parser');
const databaseConnectionService = require('./db/databaseConnectionService');
const {createLightship} = require('lightship');
const delay = require('delay');

/**
 * Override keycloak accessDenied handler to redirect to our 403 page
 */
Keycloak.prototype.accessDenied = ({res}) => res.redirect('/403');

const NO_AUTH = process.argv.includes('NO_AUTH');
const AS_REPORTER = process.argv.includes('AS_REPORTER');
const AS_ANALYST = process.argv.includes('AS_ANALYST');
const AS_ADMIN = process.argv.includes('AS_ADMIN');
const AS_PENDING = process.argv.includes('AS_PENDING');
const NO_MAIL = process.argv.includes('NO_MAIL');
const AS_CYPRESS = process.argv.includes('AS_CYPRESS');

if (NO_MAIL) process.env.NO_MAIL = true;

// True if the host has been configured to use https
const secure = /^https/.test(process.env.HOST);

// Ensure we properly crypt our cookie session store with a pre-shared key in a secure environment
if (secure && typeof process.env.SESSION_SECRET !== typeof String())
  throw new Error('export SESSION_SECRET to encrypt session cookies');
if (secure && process.env.SESSION_SECRET.length < 24)
  throw new Error('exported SESSION_SECRET must be at least 24 characters');
if (!process.env.SESSION_SECRET)
  console.warn('SESSION_SECRET missing from environment');
const secret = process.env.SESSION_SECRET || crypto.randomBytes(32).toString();

const pgPool = databaseConnectionService.createConnectionPool();

// Graphile-worker function
async function worker() {
  // Run a worker to execute jobs:
  const runner = await run({
    pgPool,
    concurrency: 5,
    pollInterval: 1000,
    noHandleSignals: true,
    taskDirectory: path.resolve(__dirname, 'tasks')
  });

  const sigtermHandler = async () => {
    try {
      await runner.stop();
    } finally {
      process.removeListener('SIGTERM', sigtermHandler);
    }
  };

  process.addListener('SIGTERM', sigtermHandler);
}

// Start graphile-worker
worker().catch((error) => {
  if (error) {
    throw error;
  }
});

const getRedirectURL = (req) => {
  if (req.query.redirectTo) return req.query.redirectTo;

  const groups = getUserGroups(req);

  return getUserGroupLandingRoute(groups);
};

app.prepare().then(async () => {
  const server = express();

  server.set('trust proxy', true);

  const lightship = createLightship();

  lightship.registerShutdownHandler(async () => {
    await delay(10000);
    await new Promise((resolve) => {
      server.close(() => pgPool.end(resolve));
    });
  });

  server.use(morgan('combined'));

  server.use(redirectRouter);

  server.use(bodyParser.json({limit: '50mb'}));

  // Only allow CORS for the <Analytics /> component
  server.use(cors({origin: 'https://www2.gov.bc.ca'}));

  // Tell search + crawlers not to index non-production environments:
  server.use(({res, next}) => {
    if (!process.env.NAMESPACE || !process.env.NAMESPACE.endsWith('-prod')) {
      res.append('X-Robots-Tag', 'noindex, noimageindex, nofollow, noarchive');
    }

    next();
  });

  // Renders a static info page on unsupported browsers.
  // Files in /static/ are excluded.
  server.use('/', (req, res, next) => {
    if (req.path.startsWith('/static/')) return next();

    const browser = Bowser.getParser(req.get('User-Agent'));
    const isUnsupported = browser.satisfies(UNSUPPORTED_BROWSERS);
    if (isUnsupported) res.redirect('/static/update-browser.html');
    else next();
  });

  const store = new PgSession({
    pool: pgPool,
    schemaName: 'ggircs_portal_private',
    tableName: 'connect_session'
  });
  server.use(
    session({
      secret,
      resave: false,
      saveUninitialized: true,
      cookie: {secure},
      store
    })
  );

  // Keycloak instantiation for dev/test/prod
  const kcNamespace = process.env.NAMESPACE
    ? namespaceMap[process.env.NAMESPACE]
    : 'dev.';
  const kcConfig = {
    realm: 'pisrwwhx',
    'auth-server-url': `https://${kcNamespace}oidc.gov.bc.ca/auth`,
    'ssl-required': 'external',
    resource: 'cas-ciip-portal',
    'public-client': true,
    'confidential-port': 0
  };
  const kcRegistrationUrl = `${kcConfig['auth-server-url']}/realms/${
    kcConfig.realm
  }/protocol/openid-connect/registrations?client_id=${
    kcConfig.resource
  }&response_type=code&scope=openid&redirect_uri=${encodeURIComponent(
    `${process.env.HOST}/login?auth_callback=1`
  )}`;
  const keycloak = new Keycloak({store}, kcConfig);

  // Nuke the siteminder session token on logout if we can
  // this will be ignored by the user agent unless we're
  // currently deployed to a subdomain of gov.bc.ca
  server.post('/logout', (_req, res, next) => {
    res.clearCookie('SMSESSION', {domain: '.gov.bc.ca', secure: true});
    next();
  });

  // Retrieves keycloak grant for the session
  server.use(
    keycloak.middleware({
      logout: '/logout',
      admin: '/'
    })
  );

  // Returns the time, in seconds, before the refresh_token expires.
  // This corresponds to the SSO idle timeout configured in keycloak.
  server.get('/session-idle-remaining-time', async (req, res) => {
    if (
      NO_AUTH ||
      AS_ADMIN ||
      AS_ANALYST ||
      AS_PENDING ||
      AS_REPORTER ||
      AS_CYPRESS
    ) {
      return res.json(3600);
    }

    if (!req.kauth || !req.kauth.grant) {
      return res.json(null);
    }

    const grant = await keycloak.getGrant(req, res);
    return res.json(
      Math.round(grant.refresh_token.content.exp - Date.now() / 1000)
    );
  });

  // For any request (other than getting the remaining idle time), refresh the grant
  // if needed. If the access token is expired (defaults to 5min in keycloak),
  // the refresh token will be used to get a new access token, and the refresh token expiry will be updated.
  server.use(async (req, res, next) => {
    if (req.path === '/session-idle-remaining-time') return next();
    if (req.kauth && req.kauth.grant) {
      try {
        const grant = await keycloak.getGrant(req, res);
        await keycloak.grantManager.ensureFreshness(grant);
      } catch (error) {
        return next(error);
      }
    }

    next();
  });

  server.use(cookieParser());

  server.use(
    postgraphile(pgPool, process.env.DATABASE_SCHEMA || 'ggircs_portal', {
      ...postgraphileOptions(),
      graphileBuildOptions: {
        connectionFilterAllowNullInput: true,
        connectionFilterRelations: true
      },
      pgSettings: (req) => {
        const opts = {
          ...authenticationPgSettings(req),
          ...generateDatabaseMockOptions(req.cookies, [
            'mocks.mocked_timestamp'
          ])
        };
        return opts;
      }
    })
  );

  server.use(
    '/voyager',
    voyagerMiddleware({
      endpointUrl: '/graphql',
      displayOptions: {hideRoot: true, showLeafFields: false}
    })
  );

  if (NO_AUTH || AS_ANALYST || AS_REPORTER || AS_ADMIN)
    server.post('/login', (req, res) => res.redirect(302, getRedirectURL(req)));
  else
    server.post('/login', keycloak.protect(), (req, res) =>
      // This request handler gets called on a POST to /login if the user is already authenticated
      res.redirect(302, getRedirectURL(req))
    );

  // Keycloak callbak; do not keycloak.protect() to avoid users being authenticated against their will via XSS attack
  server.get('/login', (req, res) => res.redirect(302, getRedirectURL(req)));

  server.get('/register', ({res}) => res.redirect(302, kcRegistrationUrl));

  server.get('*', async (req, res) => {
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
    .on('error', handleError);
});
