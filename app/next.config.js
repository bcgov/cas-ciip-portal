const path = require("path");
const Dotenv = require("dotenv-webpack");
const { withSentryConfig } = require("@sentry/nextjs");
const dotenv = require("dotenv");
dotenv.config();

module.exports = withSentryConfig(
  {
    cssModules: true,
    webpack: (config) => {
      config.plugins = config.plugins || [];

      config.plugins = [
        ...config.plugins,
        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, ".env"),
          systemvars: true,
        }),
      ];

      return config;
    },
    publicRuntimeConfig: {
      ADMIN_EMAIL: process.env.ADMIN_EMAIL,
      SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
      ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS,
      SITEWIDE_NOTICE: process.env.SITEWIDE_NOTICE,
      ENABLE_DB_MOCKS: process.env.ENABLE_DB_MOCKS,
      SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT,
      SENTRY_RELEASE: process.env.SENTRY_RELEASE,
      GGIRCS_HOST: process.env.GGIRCS_HOST,
      METABASE_HOST: process.env.METABASE_HOST,
    },
  },
  {
    // set to false to create a sentry release and upload sourcemaps
    dryRun: true,
    silent: true,
  }
);
