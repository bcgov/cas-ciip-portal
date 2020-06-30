const happoTask = require('happo-cypress/task');

module.exports = (on) => {
  on('task', happoTask);
};
