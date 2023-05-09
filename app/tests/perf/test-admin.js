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

const args = {
  productsBenchmarksQuery: {
    product_name: null,
    current_benchmark: null,
    current_eligibility_threshold: null,
    requires_emission_allocation: null,
    is_ciip_product: null,
    product_state: null,
    order_by: "PRODUCT_NAME_ASC",
    pageSize: 20,
    offset: 0,
  },
  naicsProductsAssociationsQuery: {
    naicsCodeId: base64Encode(["naics_codes", 1]),
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
    offset: null,
  },
  organisationRequestsQuery: {
    user_id: null,
    first_name: null,
    last_name: null,
    email_address: null,
    bceidBusinessName: null,
    operator_name: null,
    status: null,
    order_by: null,
    pageSize: null,
    offset: null,
  },
};

const easyGraphQLLoadTester = new LoadTesting(schemaCode, args);

const k6ConfigFile = `k6-admin-${process.env.PERF_MODE}.js`;
k6Template.render(process.env.PERF_MODE, "admin", k6ConfigFile);

easyGraphQLLoadTester.k6(k6ConfigFile, {
  customQueries: queries,
  onlyCustomQueries: true,
  selectedQueries: [
    "productsBenchmarksQuery",
    "naicsCodesQuery",
    "naicsProductsAssociationsQuery",
    "reportingYearsQuery",
    "usersQuery",
    "addFacilityQuery",
    "addOrganisationQuery",
    "applicationsQuery",
    // "organisationRequestsQuery",
  ],
  queryFile: true,
});
