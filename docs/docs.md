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

### Cypress-Axe
- Cypress-Axe is used to check accessibility issues during our end-to-end tests.
- A cy.visit() call must come before injecting cy.injectAxe()
- The function to make an accessibility check is cy.checkA11y()
- Accessibility errors will show up in the cypress panel
- Details about the errors and how to fix them will appear in the dev tools console when those errors are clicked on in the cypress browser
- Extra config details: https://www.deque.com/axe/axe-for-web/documentation/api-documentation/#api-name-axeconfigure
