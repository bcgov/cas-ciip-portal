// This is a sample task
const createWelcomeMail = require('../../email_templates/welcome.js');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (payload, helpers) => {
  console.log(process.env);
  helpers.logger.info(createWelcomeMail(payload));
};
