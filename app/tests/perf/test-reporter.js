const fs = require('fs');
const path = require('path');
const btoa = require('btoa');
const LoadTesting = require('easygraphql-load-tester');
const queries = Object.values(require('../perf/queries.json'));

const schemaCode = fs.readFileSync(
  path.join(__dirname, '../../server', 'schema.graphql'),
  'utf8'
);

const queriesWithParams = {
  disclaimerNewApplicationQuery: {
    applicationId: btoa('["applications",1]'),
    versionNumber: '1'
  },
  viewApplicationQuery: {
    applicationId: btoa('["applications",1]'),
    versionNumber: '1'
  },
  ApplicationIdPageQuery: {
    applicationId: btoa('["applications",1]')
  },
  completeSubmitQuery: {
    applicationId: btoa('["applications",1]')
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
  out: ['json=admin_result.json']
});
