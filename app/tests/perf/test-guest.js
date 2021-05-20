const fs = require('fs');
const path = require('path');
const LoadTesting = require('easygraphql-load-tester');
const queries = Object.values(require('./queries.json'));

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../server', 'schema.graphql'),
  'utf8'
);

const args = {};

const easyGraphQLLoadTester = new LoadTesting(schemaCode, args);

easyGraphQLLoadTester.k6('k6-guest.js', {
  customQueries: queries,
  onlyCustomQueries: true,
  selectedQueries: ['pagesQuery'],
  vus: 1,
  iterations: 1,
  queryFile: true
});
