const express = require('express');
const {postgraphile} = require('postgraphile');
const next = require('next');
const PgManyToManyPlugin = require('@graphile-contrib/pg-many-to-many');

const port = parseInt(process.env.PORT, 10) || 3004;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const session = require('express-session');
const bodyParser = require('body-parser');
const Keycloak = require('keycloak-connect');
const cors = require('cors');

let databaseURL = 'postgres://';
if (process.env.PGUSER) {
  databaseURL += process.env.PGUSER;
  if (process.env.PGPASSWORD) {
    databaseURL += `:${process.env.PGPASSWORD}`;
  }

  databaseURL += '@';
}

databaseURL += process.env.PGHOST || 'localhost';
if (process.env.PGPORT) {
  databaseURL += `:${process.env.PGPORT}`;
}

databaseURL += '/';
databaseURL += process.env.PGDATABASE || 'ggircs_dev';

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(cors());

  const memoryStore = new session.MemoryStore();
  server.use(
    session({
      secret: 'change me pls for the love of Jibbers Crabst',
      resave: false,
      saveUninitialized: true,
      store: memoryStore
    })
  );

  const keycloak = new Keycloak({store: memoryStore});

  server.use(
    keycloak.middleware({
      logout: '/logout',
      admin: '/'
    })
  );

  server.use(
    postgraphile(databaseURL, process.env.DATABASE_SCHEMA || 'ggircs_portal', {
      appendPlugins: [PgManyToManyPlugin],
      graphiql: true,
      classicIds: true,
      enableQueryBatching: true,
      pgSettings(req) {
        const claims = {};
        if (
          !req.kauth ||
          !req.kauth.grant ||
          !req.kauth.grant.id_token ||
          !req.kauth.grant.id_token.content
        )
          return claims;

        // TODOx: actually map jwt realms to postgres roles
        // @see https://www.postgresql.org/docs/current/default-roles.html
        // claims['role'] = 'pg_monitor';
        const token = req.kauth.grant.id_token.content;
        const properties = [
          'jti',
          'exp',
          'nbf',
          'iat',
          'iss',
          'aud',
          'sub',
          'typ',
          'azp',
          'auth_time',
          'session_state',
          'acr',
          'email_verified',
          'name',
          'preferred_username',
          'given_name',
          'family_name',
          'email'
        ];
        properties.forEach(property => {
          claims[`jwt.claims.${property}`] = token[property];
        });

        return claims;
      }
    })
  );

  server.post('/login', keycloak.protect(), (req, res) =>
    res.redirect(302, '/user-dashboard')
  );
  // Keycloak callbak; do not keycloak.protect() to avoid users being authenticated against their will via XSS attack
  server.get('/login', (req, res) => res.redirect(302, '/user-dashboard'));

  server.get('*', async (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) {
      throw err;
    }

    console.log(`> Ready on http://localhost:${port}`);
  });
});
