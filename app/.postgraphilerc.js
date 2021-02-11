module.exports = {
  options: {
    appendPlugins: [
      'postgraphile-plugin-connection-filter',
      '@graphile-contrib/pg-many-to-many'
    ],
    graphileBuildOptions: {
      connectionFilterRelations: true,
      connectionFilterAllowNullInput: true
    }
  }
};
