// This is a sample task
const dotenv = require("dotenv");
const createWelcomeMail = require("../emailTemplates/welcome.js");
dotenv.config();

module.exports = async (payload, helpers) => {
  helpers.logger.info(createWelcomeMail(payload));
};
