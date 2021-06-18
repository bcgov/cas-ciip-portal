/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-unresolved */

// This file is meant to be run as standalone by k6
// PERF_MODE=smoke k6 run k6-mutations.js

import http from 'k6/http';
import {check} from 'k6';

// eslint-disable-next-line import/extensions
import {textSummary} from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// This is the k6 way https://k6.io/docs/javascript-api/init-context/open-filepath-mode/
const queries = Object.values(JSON.parse(open('./queries.json')));

const updateFormResultMutation = queries.find((f) =>
  f.startsWith('mutation updateFormResultMutation')
);
const createApplicationMutation = queries.find((f) =>
  f.startsWith('mutation createApplicationMutation')
);

const applicationMutationVariables = (facilityId) => {
  return {
    input: {
      facilityIdInput: facilityId
    }
  };
};
const updateFormResultVariables = (formResultId, formResult) => {
  return {
    input: {
      id: formResultId,
      formResultPatch: {
        formResult
      }
    }
  };
};

export const options = require(`./configuration/${__ENV.PERF_MODE}_mutations_testing_options.js`)
  .default;

const longString = '1234567890asdfghjklzxcvbnm1234567890qwertyuioasdfghjzxcvbn'.repeat(
  200
);

const getQueries = (vu, iteration) => {
  const facilityId =
    (vu - 1) * options.scenarios.mutations_spike.iterations + iteration + 1;

  return [
    {
      name: 'createApplicationMutation',
      query: createApplicationMutation,
      variables: applicationMutationVariables(facilityId)
    },
    {
      name: 'updateFormResultMutation',
      query: updateFormResultMutation,
      variables: updateFormResultVariables(
        facilityId,
        `["a_random_key":"some random data --- ${iteration} --- ${longString}"]`
      )
    }
  ];
};

export function handleSummary(data) {
  return {
    stdout: textSummary(data, {indent: ' ', enableColors: true}) + '\n', // Show the text summary to stdout...
    [`./results/mutations_${__ENV.PERF_MODE}_result.json`]: JSON.stringify(data)
  };
}

export default () => {
  const queries = getQueries(__VU, __ITER);

  for (const query of queries) {
    const url = __ENV.GRAPHQL_ENDPOINT || 'http://localhost:3004/graphql';
    const payload = JSON.stringify({
      query: query.query,
      variables: query.variables
    });
    const params = {
      headers: {'Content-Type': 'application/json'},
      cookies: {
        'mocks.auth': 'reporter'
      },
      tags: {
        name: query.name
      }
    };
    const res = http.post(url, payload, params);
    const parsedBody = JSON.parse(res.body);

    check(parsedBody, {
      'no graphql error returned': (parsedBody) => !parsedBody.errors,
      'there is data in the response': (parsedBody) =>
        parsedBody.data !== undefined
    });

    if (parsedBody.errors) {
      console.log(
        '===================================================================='
      );
      console.log(' ');
      console.log(' ');
      console.log(res.body);
      console.log(' ');
      console.log(' ');
    }
  }
};
