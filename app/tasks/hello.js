module.exports = async (payload, helpers) => {
  const {firstName, lastName} = payload;
  helpers.logger.info(`Hello ${firstName} ${lastName}`);
};
