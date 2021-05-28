// Module that generates a k6 configuration file
// And writes it on the disk at the specified location

const fs = require('fs');

module.exports.render = function (perf_test, role, path = './k6.js') {
  const fileContent = `
import executeQueries from './executeQueries.js';
import {textSummary} from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export let options = require('./configuration/${perf_test}_testing_options.js').default;

export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true}) + "\\n", // Show the text summary to stdout...
    './${role}_${perf_test}_result.json': JSON.stringify(data),
  }
}

export default () => {
  executeQueries('${
    process.env.GRAPHQL_ENDPOINT || 'http://localhost:3004/graphql'
  }', '${role}');
};
  `;
  fs.writeFileSync(path, fileContent);
};
