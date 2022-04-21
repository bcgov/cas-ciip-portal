const fs = require("fs");
const path = require("path");
const LoadTesting = require("easygraphql-load-tester");
const queries = Object.values(require("./queries.json"));
const k6Template = require("./k6-template");

const schemaCode = fs.readFileSync(
  path.join(__dirname, "../../server", "schema.graphql"),
  "utf8"
);

const base64Encode = (jsonData) =>
  Buffer.from(JSON.stringify(jsonData)).toString("base64");

const queriesWithParams = {
  disclaimerNewApplicationQuery: {
    applicationId: base64Encode(["applications", 1]),
    versionNumber: "1",
  },
  viewApplicationQuery: {
    applicationId: base64Encode(["applications", 1]),
    versionNumber: "1",
  },
  ApplicationIdPageQuery: {
    applicationId: base64Encode(["applications", 1]),
  },
  completeSubmitQuery: {
    applicationId: base64Encode(["applications", 1]),
  },
  facilitiesQuery: {
    operatorName: null,
    facilityName: null,
    facilityType: null,
    applicationStatus: null,
    applicationIdIsNull: null,
    applicationId: null,
    organisationRowId: null,
    offset: 0,
    pageSize: 20,
    reportingYear: null,
    hasSwrsReport: null,
    facilityBcghgid: null,
  },
  reporterQuery: {},
  registrationQuery: {},
};

const easyGraphQLLoadTester = new LoadTesting(schemaCode, queriesWithParams);

const k6ConfigFile = `k6-reporter-${process.env.PERF_MODE}.js`;
k6Template.render(process.env.PERF_MODE, "reporter", k6ConfigFile);

easyGraphQLLoadTester.k6(k6ConfigFile, {
  customQueries: queries,
  onlyCustomQueries: true,
  selectedQueries: Object.keys(queriesWithParams),
  queryFile: true,
});
