const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const {postgraphile} = require('postgraphile');
const next = require('next');
const PgManyToManyPlugin = require('@graphile-contrib/pg-many-to-many');

const port = Number.parseInt(process.env.PORT, 10) || 3004;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const session = require('express-session');
const bodyParser = require('body-parser');
const Keycloak = require('keycloak-connect');
const cors = require('cors');
const voyagerMiddleware = require('graphql-voyager/middleware').express;
const groupConstants = require('../data/group-constants');
const groupData = require('../data/groups');
const {
  compactGroups,
  getUserGroupLandingRoute,
  getAllGroups,
  getPriorityGroup
} = require('../lib/user-groups');
const {run} = require('graphile-worker');
const path = require('path');
const namespaceMap = require('../data/namespace-map');

let databaseURL = 'postgres://';

const NO_AUTH = process.argv.includes('NO_AUTH');
const AS_REPORTER = process.argv.includes('AS_REPORTER');
const AS_CERTIFIER = process.argv.includes('AS_CERTIFIER');
const AS_ANALYST = process.argv.includes('AS_ANALYST');
const AS_ADMIN = process.argv.includes('AS_ADMIN');
const AS_PENDING = process.argv.includes('AS_PENDING');
const NO_PDF = process.argv.includes('NO_PDF');
const NO_MATHJAX = process.argv.includes('NO_MATHJAX');
const NO_MAIL = process.argv.includes('NO_MAIL');

if (NO_PDF) process.env.NO_PDF = true;

if (NO_MATHJAX) process.env.NO_MATHJAX = true;

if (NO_MAIL) process.env.NO_MAIL = true;

// If authentication is disabled, this superuser is used for postgraphile queries
const NO_AUTH_POSTGRES_ROLE = process.env.NO_AUTH_POSTGRES_ROLE || 'postgres';
// If authentication is disabled use the user above to connect to the database
// Otherwise, use the PGUSER env variable, or default to portal_app
const PGUSER = NO_AUTH
  ? NO_AUTH_POSTGRES_ROLE
  : process.env.PGUSER || 'portal_app';

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

// Graphile-worker function
async function worker() {
  // Run a worker to execute jobs:
  await run({
    connectionString: databaseURL,
    concurrency: 5,
    pollInterval: 1000,
    taskDirectory: path.resolve(__dirname, 'tasks')
  });
}

// Start graphile-worker
worker().catch((error) => {
  if (error) {
    throw error;
  }
});

const removeFirstLetter = (str) => str.slice(1);

const getUserGroups = (req) => {
  if (
    !req.kauth ||
    !req.kauth.grant ||
    !req.kauth.grant.id_token ||
    !req.kauth.grant.id_token.content ||
    !req.kauth.grant.id_token.content.groups
  )
    return [groupConstants.GUEST];

  const brokerSessionId = req.kauth.grant.id_token.content.broker_session_id;
  const {groups} = req.kauth.grant.id_token.content;

  const processedGroups = groups.map((value) => removeFirstLetter(value));
  const validGroups = compactGroups(processedGroups);

  if (validGroups.length === 0) {
    return brokerSessionId &&
      brokerSessionId.length === 41 &&
      brokerSessionId.startsWith('idir.')
      ? [groupConstants.PENDING_ANALYST]
      : [groupConstants.USER];
  }

  return validGroups;
};

const getRedirectURL = (req) => {
  if (req.query.redirectTo) return req.query.redirectTo;

  const groups = getUserGroups(req);

  return getUserGroupLandingRoute(groups);
};

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

  // Keycloak instantiation for dev/test/prod
  const kcNamespace = process.env.NAMESPACE
    ? namespaceMap[process.env.NAMESPACE]
    : '-dev';
  const kcConfig = {
    realm: 'pisrwwhx',
    'auth-server-url': `https://sso${kcNamespace}.pathfinder.gov.bc.ca/auth`,
    'ssl-required': 'external',
    resource: 'cas-ciip-portal',
    'public-client': true,
    'confidential-port': 0
  };
  const keycloak = new Keycloak({store: memoryStore}, kcConfig);

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
      dynamicJson: true,
      pgSettings(req) {
        if (NO_AUTH) {
          const groups = getAllGroups();
          const priorityGroup = getPriorityGroup(groups);
          return {
            'jwt.claims.sub': '00000000-0000-0000-0000-000000000000',
            'jwt.claims.user_groups': groups.join(','),
            'jwt.claims.priority_group': priorityGroup,
            role: NO_AUTH_POSTGRES_ROLE
          };
        }

        if (AS_CERTIFIER) {
          return {
            'jwt.claims.sub': '15a21af2-ce88-42e6-ac90-0a5e24260ec6',
            'jwt.claims.user_groups': 'User',
            'jwt.claims.priority_group': 'User',
            role: 'ciip_industry_user'
          };
        }

        if (AS_REPORTER) {
          return {
            'jwt.claims.sub': '809217a1-34b8-4179-95bc-6b4410b4fe16',
            'jwt.claims.user_groups': 'User',
            'jwt.claims.priority_group': 'User',
            role: 'ciip_industry_user'
          };
        }

        if (AS_ANALYST) {
          return {
            'jwt.claims.sub': '9e96cf52-9316-434e-878d-2d926a80ac8f',
            'jwt.claims.user_groups': 'Incentive Analyst',
            'jwt.claims.priority_group': 'Incentive Analyst',
            role: 'ciip_analyst'
          };
        }

        if (AS_ADMIN) {
          return {
            'jwt.claims.sub': 'eabdeef2-f95a-4dd5-9908-883b45d213ba',
            'jwt.claims.user_groups': 'Incentive Administrator',
            'jwt.claims.priority_group': 'Incentive Administrator',
            role: 'ciip_administrator'
          };
        }

        if (AS_PENDING) {
          return {
            'jwt.claims.sub': '00000000-0000-0000-0000-000000000000',
            'jwt.claims.user_groups': 'Pending Analyst',
            'jwt.claims.priority_group': 'Pending Analyst',
            role: 'ciip_guest'
          };
        }

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

        const groups = getUserGroups(req);
        token.user_groups = groups.join(',');
        token.priority_group = getPriorityGroup(groups);

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
          'email',
          'broker_session_id',
          'user_groups',
          'priority_group'
        ];
        properties.forEach((property) => {
          claims[`jwt.claims.${property}`] = token[property];
        });
        claims.role = groupData[token.priority_group].pgRole;
        return claims;
      }
    })
  );

  server.use(
    '/voyager',
    voyagerMiddleware({
      endpointUrl: '/graphql',
      displayOptions: {hideRoot: true, showLeafFields: false}
    })
  );

  if (NO_AUTH || AS_ANALYST || AS_REPORTER || AS_CERTIFIER || AS_ADMIN)
    server.post('/login', (req, res) => res.redirect(302, getRedirectURL(req)));
  else
    server.post('/login', keycloak.protect(), (req, res) =>
      // This request handler gets called on a POST to /login if the user is already authenticated
      res.redirect(302, getRedirectURL(req))
    );

  // Keycloak callbak; do not keycloak.protect() to avoid users being authenticated against their will via XSS attack
  server.get('/login', (req, res) => res.redirect(302, getRedirectURL(req)));

  server.get('*', async (req, res) => {
    return handle(req, res);
  });

  // eslint-disable-next-line unicorn/prefer-starts-ends-with, @typescript-eslint/prefer-string-starts-ends-with
  if (/^https/.test(process.env.HOST)) {
    const domain = /^https:\/\/(.+?)\/?$/.exec(process.env.HOST)[1];
    const key = fs.readFileSync(
      `/root/.acme.sh/${domain}/${domain}.key`,
      'utf8'
    );
    const cert = fs.readFileSync(
      `/root/.acme.sh/${domain}/${domain}.crt`,
      'utf8'
    );
    const options = {key, cert};
    https.createServer(options, server).listen(port, (err) => {
      if (err) {
        throw err;
      }

      console.log(`> Ready on https://localhost:${port}`);
    });
  } else {
    http.createServer(server).listen(port, (err) => {
      if (err) {
        throw err;
      }

      console.log(`> Ready on http://localhost:${port}`);
    });
  }
});
