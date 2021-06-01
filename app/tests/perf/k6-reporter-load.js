import executeQueries from './executeQueries.js';
import {textSummary} from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export let options = require('./configuration/load_testing_options.js').default;

export function handleSummary(data) {
  return {
    stdout: textSummary(data, {indent: ' ', enableColors: true}) + '\n', // Show the text summary to stdout...
    './reporter_load_result.json': JSON.stringify(data)
  };
}

export default () => {
  executeQueries('http://localhost:3004/graphql', 'reporter');
};
