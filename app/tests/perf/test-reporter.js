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

const queriesWithParams = {
  disclaimerNewApplicationQuery: {
    applicationId: base64Encode(['applications', 1]),
    versionNumber: '1'
  },
  viewApplicationQuery: {
    applicationId: base64Encode(['applications', 1]),
    versionNumber: '1'
  },
  ApplicationIdPageQuery: {
    applicationId: base64Encode(['applications', 1])
  },
  completeSubmitQuery: {
    applicationId: base64Encode(['applications', 1])
  },
  facilitiesQuery: {
    operatorName: null,
    facilityName: null,
    applicationStatus: null,
    applicationIdIsNull: null,
    applicationId: null,
    organisationRowId: null,
    offset: 0,
    pageSize: 20,
    reportingYear: null,
    lastSwrsReportingYear: null,
    facilityBcghgid: null
  },
  reporterQuery: {}
};

const easyGraphQLLoadTester = new LoadTesting(schemaCode, queriesWithParams);

easyGraphQLLoadTester.k6('k6-reporter.js', {
  customQueries: queries,
  onlyCustomQueries: true,
  selectedQueries: Object.keys(queriesWithParams),
  vus: 10,
  duration: '15s',
  queryFile: true,
  out: ['json=reporter_result.json']
});
