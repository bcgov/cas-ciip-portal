const percyHealthCheck = require('@percy/cypress/task');

module.exports = (on, _config) => {
  on('task', percyHealthCheck);
  require('cypress-plugin-retries/lib/plugin')(on);
};
