// This is a sample task
const createWelcomeMail = require('../emailTemplates/welcome.js.js.js');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (payload, helpers) => {
  console.log(process.env);
  helpers.logger.info(createWelcomeMail(payload));
};
