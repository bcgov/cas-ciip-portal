/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import {check} from 'k6';

// eslint-disable-next-line no-restricted-globals
const queries = JSON.parse(open('./easygraphql-load-tester-queries.json'));

module.exports = (role) => {
  for (const query of queries) {
    const url = 'http://localhost:3004/graphql';
    const payload = JSON.stringify({
      query: query.query,
      variables: query.variables
    });
    const params = {
      headers: {'Content-Type': 'application/json'},
      cookies: {
        'mocks.auth': role
      },
      tags: {
        name: query.name
      }
    };
    const res = http.post(url, payload, params);
    check(res, {
      'no graphql error returned': (res) => !JSON.parse(res.body).errors
    });
  }
};
