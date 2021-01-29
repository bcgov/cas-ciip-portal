/*
  Database connection service that creates a pgPool connection
  based on database options in the environment variables of calling process.


*/

const pg = require('pg');

const NO_AUTH = process.argv.includes('NO_AUTH');
// If authentication is disabled, this superuser is used for postgraphile queries
const NO_AUTH_POSTGRES_ROLE = process.env.NO_AUTH_POSTGRES_ROLE || 'postgres';

const getDatabaseUrl = () => {
  // If authentication is disabled use the user above to connect to the database
  // Otherwise, use the PGUSER env variable
  const PGUSER = NO_AUTH ? NO_AUTH_POSTGRES_ROLE : process.env.PGUSER;

  let databaseURL = 'postgres://';

  databaseURL += PGUSER;
  if (process.env.PGPASSWORD) {
    databaseURL += `:${process.env.PGPASSWORD}`;
  }

  databaseURL += '@';

  databaseURL += process.env.PGHOST || 'localhost';
  if (process.env.PGPORT) {
    databaseURL += `:${process.env.PGPORT}`;
  }

  databaseURL += '/';
  databaseURL += process.env.PGDATABASE || 'ciip_portal_dev';

  return databaseURL;
};

const createConnectionPool = () => {
  return new pg.Pool({connectionString: getDatabaseUrl()});
};

module.exports = {createConnectionPool, NO_AUTH_POSTGRES_ROLE};
