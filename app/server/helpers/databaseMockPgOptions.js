// Takes a 'cookies' object (key-value pairs in an object)
const generateForwardedCookieOptions = (cookies, fields) => {
  return fields.reduce((acc, currentKey) => {
    if (cookies[currentKey] !== undefined)
      acc[currentKey] = cookies[currentKey];
    return acc;
  }, {});
};

// if the ENABLE_DB_MOCKS env variable is set,
// creates the settings object needed for postgres to use the mocks schema by default and the fields to retrieve from the cookies
const generateDatabaseMockOptions = (cookies, fields) => {
  if (process.env.ENABLE_DB_MOCKS !== 'true') return {};

  return {
    ...buildForwardedCookieOptions(cookies, fields),
    search_path: 'mocks,pg_catalog,public'
  };
};

module.exports = {
  generateForwardedCookieOptions,
  generateDatabaseMockOptions
};
