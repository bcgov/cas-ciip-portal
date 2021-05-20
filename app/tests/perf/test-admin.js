const fs = require('fs');
const path = require('path');
const LoadTesting = require('easygraphql-load-tester');
const queries = Object.values(require('./queries.json'));

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../server', 'schema.graphql'),
  'utf8'
);

const base64Encode = (jsonData) =>
  Buffer.from(JSON.stringify(jsonData)).toString('base64');

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
  },
  naicsProductsAssociationsQuery: {
    naicsCodeId: base64Encode(['naics_codes', 1])
  },
  applicationsQuery: {
    id: null,
    operator_name: null,
    facility_name: null,
    reporting_year: null,
    submission_date: null,
    status: null,
    order_by: null,
    pageSize: null,
    offset: null
  },
  organisationRequestsQuery: {
    user_id: null,
    first_name: null,
    last_name: null,
    email_address: null,
    operator_name: null,
    status: null,
    order_by: null,
    pageSize: null,
    offset: null
  }
};

const easyGraphQLLoadTester = new LoadTesting(schemaCode, args);

easyGraphQLLoadTester.k6('k6-admin.js', {
  customQueries: queries,
  onlyCustomQueries: true,
  selectedQueries: [
    'productsBenchmarksQuery',
    'naicsCodesQuery',
    'naicsProductsAssociationsQuery',
    'reportingYearsQuery',
    'usersQuery',
    'addFacilityQuery',
    'addOrganisationQuery',
    'applicationsQuery',
    'organisationRequestsQuery'
  ],
  vus: 1,
  duration: '10s',
  queryFile: true,
  out: ['json=admin_result.json']
});
