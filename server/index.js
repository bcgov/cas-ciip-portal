const express = require('express')
const { postgraphile } = require("postgraphile");
const next = require('next')
const path = require('path')
const fs = require('fs')
const port = parseInt(process.env.PORT, 10) || 3004
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const schemaPath = path.join(__dirname, '/schema.graphql')

app.prepare().then(() => {
    const server = express()

    server.use(
      postgraphile(
            process.env.DATABASE_URL    || 'postgres://localhost/ggircs_dev',
            process.env.DATABASE_SCHEMA || 'ggircs_portal',
            {
              graphiql: true,
              exportGqlSchemaPath: schemaPath,
              classicIds: true
            }
        )
    );

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
