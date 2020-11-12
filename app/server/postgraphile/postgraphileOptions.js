const {makePluginHook} = require('postgraphile');
const PgManyToManyPlugin = require('@graphile-contrib/pg-many-to-many');
const PostgraphileLogConsola = require('postgraphile-log-consola');

const postgraphileOptions = () => {
  // Use consola for logging instead of default logger
  const pluginHook = makePluginHook([PostgraphileLogConsola]);

  let postgraphileOptions = {
    pluginHook,
    appendPlugins: [PgManyToManyPlugin],
    classicIds: true,
    enableQueryBatching: true,
    dynamicJson: true
  };

  if (process.env.NODE_ENV === 'production') {
    postgraphileOptions = {
      ...postgraphileOptions,
      retryOnInitFail: true,
      extendedErrors: ['errcode']
    };
  } else {
    postgraphileOptions = {
      ...postgraphileOptions,
      graphiql: true,
      enhanceGraphiql: true,
      allowExplain: true,
      extendedErrors: ['hint', 'detail', 'errcode'],
      showErrorStack: 'json'
    };
  }

  return postgraphileOptions;
};

module.exports = postgraphileOptions;
