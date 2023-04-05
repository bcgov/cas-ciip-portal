const { makePluginHook } = require("postgraphile");
const PgManyToManyPlugin = require("@graphile-contrib/pg-many-to-many");
const PostgraphileLogConsola = require("postgraphile-log-consola");
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const Sentry = require("@sentry/nextjs");
const PostGraphileUploadFieldPlugin = require("./uploadFieldPlugin");
const { resolveFileUpload } = require("./resolveFileUpload");

const postgraphileOptions = () => {
  // Use consola for logging instead of default logger
  const pluginHook = makePluginHook([PostgraphileLogConsola]);

  let postgraphileOptions = {
    pluginHook,
    appendPlugins: [
      PgManyToManyPlugin,
      ConnectionFilterPlugin,
      PostGraphileUploadFieldPlugin,
    ],
    classicIds: true,
    enableQueryBatching: true,
    dynamicJson: true,
    graphileBuildOptions: {
      // ...PostgraphileRc.options.graphileBuildOptions,
      connectionFilterAllowNullInput: true,
      connectionFilterRelations: true,
      uploadFieldDefinitions: [
        {
          match: ({ table, column }) =>
            table === "attachment" && column === "file",
          resolve: resolveFileUpload,
        },
      ],
    },
  };

  if (process.env.SENTRY_ENVIRONMENT) {
    postgraphileOptions = {
      ...postgraphileOptions,
      handleErrors: (errors) => {
        Sentry.captureException(errors);
        return errors.map(({ errcode }) => ({
          errcode,
        }));
      },
    };
  } else {
    postgraphileOptions = {
      ...postgraphileOptions,
      extendedErrors: ["hint", "detail", "errcode"],
      showErrorStack: "json",
    };
  }

  if (process.env.NODE_ENV === "production") {
    postgraphileOptions = {
      ...postgraphileOptions,
      retryOnInitFail: true,
    };
  } else {
    postgraphileOptions = {
      ...postgraphileOptions,
      graphiql: true,
      enhanceGraphiql: true,
      allowExplain: true,
    };
  }

  return postgraphileOptions;
};

module.exports = postgraphileOptions;
