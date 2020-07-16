const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const {postgraphile} = require('postgraphile');
const nextjs = require('next');
const PgManyToManyPlugin = require('@graphile-contrib/pg-many-to-many');

const crypto = require('crypto');
const pg = require('pg');
const port = Number.parseInt(process.env.PORT, 10) || 3004;
const dev = process.env.NODE_ENV !== 'production';
const app = nextjs({dev});
const handle = app.getRequestHandler();
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
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
const namespaceMap = require('../data/kc-namespace-map');

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

// True if the host has been configured to use https
// eslint-disable-next-line unicorn/prefer-starts-ends-with, @typescript-eslint/prefer-string-starts-ends-with
const secure = /^https/.test(process.env.HOST);

// Ensure we properly crypt our cookie session store with a pre-shared key in a secure environment
if (secure && typeof process.env.SESSION_SECRET !== typeof String())
  throw new Error('export SESSION_SECRET to encrypt session cookies');
if (secure && process.env.SESSION_SECRET.length < 24)
  throw new Error('exported SESSION_SECRET must be at least 24 characters');
if (!process.env.SESSION_SECRET)
  console.warn('SESSION_SECRET missing from environment');
const secret = process.env.SESSION_SECRET || crypto.randomBytes(32).toString();

const pgPool = new pg.Pool({connectionString: databaseURL});

// Graphile-worker function
async function worker() {
  // Run a worker to execute jobs:
  await run({
    pgPool,
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

  // Enable serving ACME HTTP-01 challenge response written to disk by acme.sh
  // https://letsencrypt.org/docs/challenge-types/#http-01-challenge
  // https://github.com/acmesh-official/acme.sh
  server.use(
    '/.well-known',
    express.static(path.resolve(__dirname, '../.well-known'))
  );
  server.use(bodyParser.json());
  server.use(cors());

  // Tell search + crawlers not to index non-production environments:
  server.use(({res, next}) => {
    if (!process.env.NAMESPACE || !process.env.NAMESPACE.endsWith('-prod')) {
      res.append('X-Robots-Tag', 'noindex, noimageindex, nofollow, noarchive');
    }

    next();
  });

  const store = new PgSession({
    pool: pgPool,
    schemaName: 'ggircs_portal_private',
    tableName: 'connect_session'
  });
  server.use(
    session({
      secret,
      resave: false,
      saveUninitialized: true,
      cookie: {secure},
      store
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
  const kcRegistrationUrl = `${kcConfig['auth-server-url']}/realms/${
    kcConfig.realm
  }/protocol/openid-connect/registrations?client_id=${
    kcConfig.resource
  }&response_type=code&scope=openid&redirect_uri=${encodeURIComponent(
    `${process.env.HOST}/login?auth_callback=1`
  )}`;
  const keycloak = new Keycloak({store}, kcConfig);

  // Nuke the siteminder session token on logout if we can
  // this will be ignored by the user agent unless we're
  // currently deployed to a subdomain of gov.bc.ca
  server.post('/logout', (_req, res, next) => {
    res.clearCookie('SMSESSION', {domain: '.gov.bc.ca', secure: true});
    next();
  });

  server.use(
    keycloak.middleware({
      logout: '/logout',
      admin: '/'
    })
  );

  // The graphile config object should be swapped in dev/prod
  // https://www.graphile.org/postgraphile/usage-library/#for-development
  // https://www.graphile.org/postgraphile/usage-library/#for-production
  server.use(
    postgraphile(pgPool, process.env.DATABASE_SCHEMA || 'ggircs_portal', {
      appendPlugins: [PgManyToManyPlugin],
      graphiql: process.env.NODE_ENV !== 'production',
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

        const groups = getUserGroups(req);
        const priorityGroup = getPriorityGroup(groups);

        const claims = {
          role: groupData[priorityGroup].pgRole
        };
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

        token.user_groups = groups.join(',');
        token.priority_group = priorityGroup;

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

  server.get('/register', ({res}) => res.redirect(302, kcRegistrationUrl));

  server.get('*', async (req, res) => {
    return handle(req, res);
  });

  if (secure) {
    const domain = /^https:\/\/(.+?)\/?$/.exec(process.env.HOST)[1];
    const key = fs.readFileSync(
      `/root/.acme.sh/${domain}/${domain}.key`,
      'utf8'
    );
    const cert = fs.readFileSync(
      `/root/.acme.sh/${domain}/fullchain.cer`,
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
