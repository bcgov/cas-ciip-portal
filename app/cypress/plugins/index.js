const Axios = require('axios');

module.exports = (on, _config) => {
  on('task', {
    percyHealthCheck() {
      return (
        Axios.get('http://localhost:5338/percy/healthcheck', {
          timeout: 10000
        }) // This is not a real promise
          // eslint-disable-next-line promise/prefer-await-to-then
          .then(() => true)
          .catch(() => false)
      );
    }
  });

  require('cypress-plugin-retries/lib/plugin')(on);
};
