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

### Cypress: Ignoring email
- If you want to ignore the email test locally add an env flag to the command `yarn cypress --env NO_MAIL=true`
- `yarn test:e2e --env NO_MAIL=true` also works

### Authentication

We use Keycloak to manage authentication of users (using username/password or IDIR) and define their privileges using groups. The Keycloak realm configuration is available in `app/keycloak-realm-export.json`

### Mailhog
- MailHog can be run via docker with:
- `sudo docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog`
- This starts a server on localhost:8025 & uses smtp port 1025
- #### Running locally:
- There are several ways to install MailHog locally detailed here: https://github.com/mailhog/MailHog
- These are the steps I took to install it locally:
- These steps require go-lang. If you already have go set up. Skip ahead to `Install MailHog`
#### Install Go:
- `sudo apt install golang-go`
- Navigate to home directory
- `mkdir gocode`
- `echo "export GOPATH=$HOME/gocode" >> ~/.profile`
- `source ~/.profile`
#### Install MailHog:
- `go get github.com/mailhog/MailHog`
- `sudo cp /home/{user}/gocode/bin/MailHog /usr/local/bin/mailhog` --> replace `{user}` with your user
- You should now be able to run mailhog from your command line with the command: `mailhog`
- MailHog can be configured in a variety of ways: https://github.com/mailhog/MailHog/blob/master/docs/CONFIG.md
- By default command `mailhog` should start the server with:
  - SMTP server starts on port 1025
  - HTTP server starts on port 8025
  - Uses in-memory message storage
