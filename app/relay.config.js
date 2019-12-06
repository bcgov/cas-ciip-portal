const path = require('path');

module.exports = {
  src: path.resolve(__dirname, '../'),
  language: 'typescript',
  artifactDirectory: path.resolve(__dirname, './__generated__'),
  customScalars: {
    Datetime: 'String'
  },
  exclude: [
    '**/.next/**',
    '**/node_modules/**',
    '**/__generated__/**',
    '**/server/**'
  ],
  schema: path.resolve(__dirname, './server/schema.graphql')
};
