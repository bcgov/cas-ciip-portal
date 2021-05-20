const fs = require('fs');
const path = require('path');
const LoadTesting = require('easygraphql-load-tester');
const queries = Object.values(require('./queries.json'));

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../server', 'schema.graphql'),
  'utf8'
);

const queriesWithParams = {
  pagesQuery: {},
  loginRedirectQuery: {}
};

const easyGraphQLLoadTester = new LoadTesting(schemaCode, queriesWithParams);

easyGraphQLLoadTester.k6('k6-guest.js', {
  customQueries: queries,
  onlyCustomQueries: true,
  selectedQueries: Object.keys(queriesWithParams),
  vus: 1,
  iterations: 1,
  queryFile: true,
  out: ['json=guest_result.json']
});
