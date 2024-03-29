/* eslint-disable import/no-unresolved */
import http from "k6/http";
import { check } from "k6";

// eslint-disable-next-line no-restricted-globals
const queries = JSON.parse(open("./easygraphql-load-tester-queries.json"));

module.exports = (url, role) => {
  for (const query of queries) {
    const payload = JSON.stringify({
      query: query.query,
      variables: query.variables,
    });
    const params = {
      headers: { "Content-Type": "application/json" },
      cookies: {
        "mocks.auth": role,
      },
      tags: {
        name: query.name,
      },
    };
    const res = http.post(url, payload, params);
    const parsedBody = JSON.parse(res.body);

    check(parsedBody, {
      "no graphql error returned": (parsedBody) => !parsedBody.errors,
      "there is data in the response": (parsedBody) =>
        parsedBody.data !== undefined,
    });

    if (parsedBody.errors) {
      console.log(
        "===================================================================="
      );
      console.log(" ");
      console.log(" ");
      console.log(res.body);
      console.log(" ");
      console.log(" ");
    }
  }
};
