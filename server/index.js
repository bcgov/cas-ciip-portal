const express = require('express');
const { postgraphile } = require("postgraphile");
const next = require('next')
const path = require('path')
const fs = require('fs')
const port = parseInt(process.env.PORT, 10) || 3004
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const schemaPath = path.join(__dirname, '/schema.graphql')
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
    databaseURL += `:${process.env.PGPORT}`
}
databaseURL += '/'
databaseURL += process.env.PGDATABASE || 'ggircs_dev'

app.prepare().then(() => {
    const server = express()

    server.use(bodyParser.json());
    server.use(cors());

    const memoryStore = new session.MemoryStore();
    server.use(session({
        secret: 'change me pls for the love of Jibbers Crabst',
        resave: false,
        saveUninitialized: true,
        store: memoryStore,
    }));

    const keycloak = new Keycloak({store: memoryStore});

    server.use(keycloak.middleware({
        logout: '/logout',
        admin: '/',
    }));

    server.use(
        postgraphile(
            databaseURL,
            process.env.DATABASE_SCHEMA || 'ggircs_portal',
            {
                graphiql: true,
                exportGqlSchemaPath: schemaPath,
                classicIds: true,
                pgSettings(req) {
                    let claims = {}
                    if ((((req.kauth || {}).grant || {}).id_token || {}).content) {
                        // TODO: actually map jwt realms to postgres roles
                        // @see https://www.postgresql.org/docs/current/default-roles.html
                        // claims['role'] = 'pg_monitor';
                        const token = req.kauth.grant.id_token.content
                        for (const property in token) {
                            claims[`jwt.claims.${property}`] = token[property]
                        }
                    }
                    console.dir(claims);
                    return {
                        ...claims
                    };
                },
            }
            )
            );

            server.get('/form-builder', keycloak.protect());

            server.get('*', (req, res) => {
                return handle(req, res)
            })

            server.listen(port, err => {
                if (err) throw err
                console.log(`> Ready on http://localhost:${port}`)
            })
        })
