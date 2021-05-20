const fs = require('fs');
const path = require('path');
const LoadTesting = require('easygraphql-load-tester');
const queries = Object.values(require('./queries.json'));

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../server', 'schema.graphql'),
  'utf8'
);

const args = {
  productsBenchmarksQuery: {
    product_name: null,
    current_benchmark: null,
    current_eligibility_threshold: null,
    requires_emission_allocation: null,
    is_ciip_product: null,
    product_state: null,
    order_by: 'PRODUCT_NAME_ASC',
    pageSize: 20,
    offset: 0
  }
};

const easyGraphQLLoadTester = new LoadTesting(schemaCode, args);

// easyGraphQLLoadTester.k6('k6.js', {
//   customQueries: queries,
//   onlyCustomQueries: true,
//   selectedQueries: ['pagesQuery'],
//   vus: 1,
//   iterations: 1,
//   queryFile: true
// });

easyGraphQLLoadTester.k6('k6-admin.js', {
  customQueries: queries,
  onlyCustomQueries: true,
  selectedQueries: ['productsBenchmarksQuery'],
  vus: 10,
  duration: '30s',
  queryFile: true
});
