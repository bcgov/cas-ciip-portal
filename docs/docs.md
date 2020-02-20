# Add any on the fly documentation in this file.

### Schema usage
- The ggircs_portal schema is the `public` schema. It contains all database entities that should be exposed to the api. ie search functions, tables, views etc
- The ggircs_portal_private schema is the `private` schema. It contains functions that are necessary for the operation and security of the portal, but should not be exposed via the public api.


### Graphile-worker
- The workers run independent of the main app (see `dev` or `start` in package.json)
- Graphile-worker requires a 'tasks' folder that contain javascript task files describing the actions that task should carry out
- Calling graphile worker is done with an SQL statement like:
- `select graphile_worker.add_job('<task(filename in tasks folder)>', json_build_object(key1, value1, key2, value2...));`
- Full graphile-worker docs: https://github.com/graphile/worker
