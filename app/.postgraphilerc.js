module.exports = {
  options: {
    appendPlugins: [
      "postgraphile-plugin-connection-filter",
      "@graphile-contrib/pg-many-to-many",
    ],
    graphileBuildOptions: {
      connectionFilterAllowNullInput: true,
      connectionFilterRelations: true,
    },
  },
};
