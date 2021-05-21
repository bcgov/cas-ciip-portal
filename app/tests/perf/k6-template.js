// Module that generates a k6 configuration file
// And writes it on the disk at the specified location

const fs = require('fs');

module.exports.render = function (perf_test, role, path = './k6.js') {
  const fileContent = `
import executeQueries from './executeQueries.js';

export let options = require('./configuration/${perf_test}_testing_options.js').default;

export default () => {
  executeQueries('${role}');
};
  `;
  fs.writeFileSync(path, fileContent);
};
