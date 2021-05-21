const fs = require('fs');
const path = require('path');
const LoadTesting = require('easygraphql-load-tester');
const queries = Object.values(require('./queries.json'));
const k6Template = require('./k6-template');

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../server', 'schema.graphql'),
  'utf8'
);

const queriesWithParams = {
  pagesQuery: {},
  loginRedirectQuery: {}
};

const easyGraphQLLoadTester = new LoadTesting(schemaCode, queriesWithParams);

const k6ConfigFile = `k6-guest-${process.env.PERF_MODE}.js`;
k6Template.render(process.env.PERF_MODE, '', k6ConfigFile);

easyGraphQLLoadTester.k6(k6ConfigFile, {
  customQueries: queries,
  onlyCustomQueries: true,
  selectedQueries: Object.keys(queriesWithParams),
  queryFile: true,
  out: ['json=results/guest_result.json']
});
