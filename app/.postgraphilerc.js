const {
  resolveFileUpload,
} = require("./server/postgraphile/resolveFileUpload");

module.exports = {
  options: {
    appendPlugins: [
      "postgraphile-plugin-connection-filter",
      "@graphile-contrib/pg-many-to-many",
      `${process.cwd()}/server/postgraphile/uploadFieldPlugin.js`,
    ],
    enableQueryBatching: true,
    graphileBuildOptions: {
      connectionFilterAllowNullInput: true,
      connectionFilterRelations: true,
      uploadFieldDefinitions: [
        {
          match: ({ schema, table, column, tags }) =>
            table === "attachment" && column === "file",
          resolve: resolveFileUpload,
        },
      ],
    },
  },
};
