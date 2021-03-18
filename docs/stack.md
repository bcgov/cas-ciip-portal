# Button Stack Documentation and Style Guide

The Button Stack is currently a work in progress, in use in the CAS CIIP portal ([https://github.com/bcgov/cas-ciip-portal](https://github.com/bcgov/cas-ciip-portal)). It is a composed of a backend made with a PostgreSQL database and an Express server with a PostGraphile API, and a frontend made with Next.js, React, Relay and TypeScript.

This document defines the interactions between the elements of the stack, and the various style conventions used across the code base.

## Stack Overview

### PostgreSQL

#### Why PostgreSQL?

- Extensions (PostGIS, XML)
- Scale across multiple nodes with Citus
- Access to other databases using foreign data wrappers
- Unit testing with pgtap
- Support for functions written in various programming languages

### Database change management

We reviewed several tools which would allow us to handle database migrations. The following features were considered required for the tool:

- The tool should support migration scripts should written in SQL and PL/PGSQL
- The tool should allow us to define releases following semantic versioning
- The tool should be able to handle failing migrations, and deploy migrations in a transaction

The two tools we analyzed in depth are sqitch ([https://sqitch.org/](https://sqitch.org/)) and Flyway ([https://flywaydb.org/](https://flywaydb.org/)).

#### Migrations and releases

In database change management tools, a migration is a set of SQL commands creating, deleting or altering a set of database object. In both sqitch and flyway, migrations can be stored in SQL files. Additionally, flyway supports writing migrations in Java files, for more complex processes.

The mechanism used to define the migrations order is different for both tools.

- Sqitch uses a &quot;plan&quot; file, listing the migrations names in the order in which they should be deployed, and their dependencies. The sqitch tag command allows to cut releases
- Flyway uses version numbers, stored in the file name, e.g. _V1.44.23.76\_\_migration_description.sql_ for &quot;versioned migrations&quot; and supports &quot;repeatable migrations&quot; (filename starting with &quot;R\_\_&quot;), which are executed after all the versioned migrations are deployed, in order of their descriptions (e.g. _R\_\_0001_viewA.sql_, then _R\_\_0002_viewB.sql_)

#### Reverting migrations

In development and test environments, reverting migrations is required to start from a clean database. In production, this can be needed to undo a &quot;bad&quot; release.

- For both use cases, sqitch requires the developer to write a &quot;revert&quot; migration for each &quot;deploy&quot; migration they write (a sqitch &quot;change&quot; has as _deploy_, a _revert_, and a _verify_ file)
- For dev/test environments, Flyway has a &quot;clean&quot; command that deletes all the objects in the schemas managed by Flyway. For production reverts, the &quot;pro&quot; version of Flyway supports &quot;undo&quot; migrations, but this could be accomplished by deploying another release with migrations that undo the changes.

#### Handling Errors in Migrations

Errors occurring during the migrations are common in dev and test environments, due to bugs in the migration files. They can also occur in production if, for instance, there are issues connecting to the database.

Flyway handles errors by wrapping each migration in a transaction. Optionally, the entire set of migrations being deployed can be wrapped in a single transaction by setting the _group_ property to _true_.

Sqitch makes use of the verify scripts to ensure that a migration is deployed. If a migration fails, it will revert the previous migrations that were deployed in the current run, using the revert script. Sqitch does not wrap migrations in transactions, requiring the developer to add begin and commit/rollback statements to each script. Additionally, sqitch does not support wrapping the entire set of migrations in a single transaction. Furthermore, it does not reuse the connection to the database, making it very sensitive to DNS issues. Such issues have even led to the database and the sqitch changelog to be in inconsistent state, requiring manual fixes, because executing a migration and adding it to the database changelog is not done in a transaction.

#### Other tools

Other tools such as alembic ([https://alembic.sqlalchemy.org/](https://alembic.sqlalchemy.org/)) and liquibase ([https://www.liquibase.org/](https://www.liquibase.org/)) were reviewed but were not selected as

- Alembic does not use plain SQL files for migrations (uses python files)
- Liquibase has a very verbose format for the changelog, plain SQL files are supported but are not the default, and documentation is lacking.

### Express + PostGraphile

### Next.js (incl. React)

### Relay

### Typescript

### Yarn

We are using Yarn for package management as opposed to NPM. One of the advantages to using Yarn is the use of [resolutions](https://classic.yarnpkg.com/en/docs/selective-version-resolutions/). Resolutions can be used to specify package versions, which is helpful when addressing vulnerabilities in sub-dependencies. Using a glob pattern any package dependency or sub-dependency can be set to a specific version not affected by the vulnerability.

### Authentication and Authorization

Authentication is performed using the Red Hat SSO provider (Keycloak). We use the [`keycloak-connect`](https://github.com/keycloak/keycloak-nodejs-connect) package to manage authentication from our application server.

#### Session expiry

> In order to minimize the time period an attacker can launch attacks over active sessions and hijack them, it is mandatory to set expiration timeouts for every session, establishing the amount of time a session will remain active.
> -- [OWASP cheatsheet](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Session_Management_Cheat_Sheet.md#session-expiration)

Keycloak session timeouts are dictated by the `SSO Session Idle`, `SSO Session Max` and `Access Token Lifespan` configured in the keycloak realm. The keycloak session will automatically expire if there is no activity for the time specified in `SSO Session Idle`.

Our application client uses the `/session-idle-remaining-time` endpoint to check whether the session has automatically expired due to inactivity, and redirects the user to a login page, indicating that their session expired. Without that feature, the user would encounter an error on their next interaction with the page, as they would potentially trigger a request that requires them to be authenticated.

For every request, Our application server uses the `Grant.ensureFreshness` method to extend the session and ensures it does not idle. That method will only use the refresh token (and thus bump the `SSO Session Idle` timeout) if the access token is expired, which means that our idle timeout is technically `(SSO Session Idle) - (Access Token Lifespan)`.

## Documentation

### Writing to the database using Relay mutations

#### Mutation Chains

- Individual mutations can be chained on the front-end, but this approach does not effectively cover transactionality.
- To make all actions transactional (succeed as one block or fail as one block), Whenever a mutation has cascading effect we have written some custom mutation chains in the database
- For example: creating a new application in the ggircs_portal schema also requires (among other. things) the creation of a row in the application_status table.
- The creation of the row in the application table and the row in the application_status table is completed in one transactional block in a custom defined mutation chain function written in sql, which can then be used in place of the front-end chained mutations.
- Be careful to define the proper return type for any custom functions as an incorrect function return can cause the mutation to fail.

#### Optimistic Updates

Optimistic update is functionality provided by relay that boosts the perceived responsiveness of mutations. The data sent to the server is used to optimistically update the local relay store before receiving a response from the server in order to more quickly display the mutation effects in a way that assumes the mutation will succeed. Once a response is returned from the server, if the mutation results in an error the optimistic update that was applied to the local store is rolled back. If the mutation succeeds, any temporary optimistic data (ie IDs) will be replaced with the proper data from the server response. Details on how to configure updater and optimisticUpdater functions are detailed in the [Relay docs](https://relay.dev/docs/en/mutations#using-updater-and-optimisticupdater).

#### Debouncing Mutations

Idempotent mutations, for instance mutations that update an object, are candidates for being debounced.

We implemented a middleware for the relay network layer which will ensure that mutations that are dispatched in quick succession (the default debounce timeout is `250ms`) are debounced if needed. In order for the network layer to know which mutations to debounce, the client code should provide a `debounceKey`, is passed as a parameter to `BaseMutation.performMutation()`, which identifies the set of mutations that should be debounced together.
For instance, when updating our form results, we want to debounce the `update-form-result-mutation` based on the input `id`, which results in the following mutation code:

```ts
const m = new BaseMutation<updateFormResultMutationType>(
  "update-form-result-mutation"
);

return m.performMutation(
  environment,
  mutation,
  variables,
  optimisticResponse,
  null,
  `update-form-result${variables.input.id}` // the debounceKey
);
```

Including the `id` in the `debounceKey` ensures that, if the client dispatches two `update-form-result-mutation` for two different `formResult` objects, both mutations will be sent to the server side.

There are a couple of important features with our debounce middleware implementation:

- As the debouncing of mutations is done in the network layer, this means that the `optimisticResponse` does not get debounced, thus immediately updating the client-side relay state.
- For a given client, only one mutation can be debounced at a given time. This ensures that the order of mutations is preserved. For instance if a mutation with `debounceKey='a'` is dispatched, and a mutation with a different `debounceKey` (or no `debounceKey`) is dispatched within the debounce timeout, then the first mutation would be released by the debounce middleware before processing the second one.

### Dealing with unknown types generated by Relay

### Database Views and PostGraphile

We use PostGraphile [smart comments](https://www.graphile.org/postgraphile/smart-comments/#constraints) in order to add constraints like primary and foreign keys to views (and types where necessary). Adding a primary key to a view or type via a smart comment makes views more 'table like', allowing postgraphile to add a [nodeId](https://www.graphile.org/postgraphile/node-id/) to that entity. This ID in turn is used by Relay's [GraphQL Global Object Identification Specification](https://relay.dev/graphql/objectidentification.htm) to uniquely identify, cache and refetch data.

Note: We use the PostGraphile `--classic-ids` flag to rename `nodeId` to `id` and the database `id` column to `rowId` as required by the Relay specification. Details [here](https://www.graphile.org/postgraphile/node-id/).

### @Connection Directive

The @Connection Directive is a helpful, but poorly documented feature of Relay that helps to 'live update' results in the UI. The best documentation is in [this blogpost](https://www.prisma.io/blog/relay-moderns-connection-directive-1ecd8322f5c8), though it is still a bit outdated and non-comprehensive. There are two different scenarios where @connection needs different implementations:

1. The @connection is defined on a CHILD of an entity.
   EXAMPLE:

Fragment Definition:

```ts
export default createFragmentContainer(OrganisationsComponent, {
  query: graphql`
    fragment Organisations_query on Query {
      session {
        ciipUserBySub {
          id
          ciipUserOrganisationsByUserId(first: 2147483647)
            @connection(key: "Organisations_ciipUserOrganisationsByUserId") {
            edges {
              node {
                id
              }
            }
          }
        }
      }
  `,
});
```

- Notice that the @connection is defined on `ciipUserOrganisationByUserId` which is a child of the ciipUserBySub.
- This means the connection has a ciipUser parent.
- In this case the mutation configs needed to append to this connection can be defined as below.

Mutation definition:

```ts
const mutation = graphql`
  mutation createUserOrganisationMutation(
    $input: CreateCiipUserOrganisationInput!
  ) {
    createCiipUserOrganisation(input: $input) {
      ciipUserOrganisationEdge {
        node {
          ...UserOrganisation_userOrganisation
        }
      }
    }
  }
`;
```

- The return object inside the createCiipUserOrganisation is an object of ciipUserOrganisationEdge, that edge is used in the updater configs:

Mutation config definition:

```ts
const configs: DeclarativeMutationConfig[] = [
  {
    type: "RANGE_ADD",
    parentID: userId,
    connectionInfo: [
      {
        key: "Organisations_ciipUserOrganisationsByUserId",
        rangeBehavior: "append",
      },
    ],
    edgeName: "ciipUserOrganisationEdge",
  },
];
```

- The parentID is the ID of the parent ciipUser, which can be passed to the mutation as a parameter.
- The key is the key defined in the @connection portion of the fragment.
- type/rangeBehaviur is what to do with this edge (in this case, append).
- The edgeName is the edge to add (defined above in the mutation definition).

2. The @connection is defined at the root-level query:
   EXAMPLE:

Fragment Defintion:

```ts
export default createFragmentContainer(ProductList, {
  query: graphql`
    fragment ProductListContainer_query on Query {
      allProducts(first: $pageSize)
        @connection(key: "ProductListContainer_allProducts", filters: []) {
        edges {
          node {
            id
            ...ProductRowItemContainer_product
          }
        }
      }
    }
  `,
});
```

Some root-level @connection gotchas:

- Here the @connection is on the root-level `allProducts` query & thus has no parent entity.
- In this case, notice the @connection needs both the key AND a set of filters (which can be an empty array) in order to be found by relay.
- In our implementation, we have `query` as the root level entity that everything else falls under. All `query` entities have an id of `query` (This is needed in the mutation `RANGE CONFIG`).

The mutation definition remains unchanged from example 1. (productEdge will be the return object under createProductMutation).
The difference is in the mutation config defintion, where we passed a userID as the parentID in example 1, the parentID for a root-level @connection is `query`.
Mutation config definition:

```ts
const configs: DeclarativeMutationConfig[] = [
  {
    type: "RANGE_ADD",
    parentID: "query",
    connectionInfo: [
      {
        key: connectionKey,
        rangeBehavior: "append",
      },
    ],
    edgeName: "productEdge",
  },
];
```

### React JsonSchema Forms

[rjsf documentation](https://react-jsonschema-form.readthedocs.io/en/latest/)

We use the react-jsonschema-form library to render many of our more complicated forms. The rjsf library makes our forms highly customizable. We override the default behaviour of the form components in several places to tailor the templated layouts and internal logic to our specific needs.

#### Custom template example

[custom templates](https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/custom-templates/)
Example: app/containers/Forms/SummaryFormArrayFieldTemplate.tsx

Overriding a template is done by creating a new component with the appropriate rjsf props (in the example above, ArrayFieldTemplateProps) and redefining the template to suit specific needs. In the example above, we have rewritten the template to customize how each field in an array should be displayed when shown on the Summary page. We use some logic in the custom template to add display:none css to each field that has a value of zero to block those fields from rendering on the Summary page.

The custom template is applied by defining it in the props where the JsonSchemaForm is instantiated (see app/containers/Applications/ApplicationDetailsCardItem.tsx for where the example custom template above is applied).

#### Custom field example

[custom fields](https://react-jsonschema-form.readthedocs.io/en/latest/advanced-customization/custom-widgets-fields/)
Example: app/containers/Forms/FuelRowIdField.tsx

Overriding a field is done the same way as a template, by creating a new component with the appropriate rjsf props (in the example above we extend FieldProps). In the example we have customized the behaviour of the RowId field. This field is a numeric ID that corresponds to an enumerated list of fuel names. Our custom field makes use of [useMemo()](https://reactjs.org/docs/hooks-reference.html#usememo) to only render values when necessary and matches the ID with the corresponding name, rendering the name of the fuel in the list rather than the numerical ID.

A custom field is applied in the same way as the template, defining it in the props where the JsonSchemaForm is instantiated. This FuelRowId example is one of several custom fields we apply to this form, so we have wrapped all the customized fields in one component (see app/components/Application/ApplicationDetailsCardItemCustomFields.tsx) and passed that wrapper to be defined in the props (see app/containers/Applications/ApplicationDetailsCardItem for where this wrapper is applied).

## Style Guide

###

### Database naming conventions

Snake case. Don&#39;t use reserved words (c.f. style test)

### Front-end naming conventions

### \*status properties

When an entity has a 'status' context we create a new table (with a foreign key to the associated entity), type and computed_column function for the status.

- A separate table for the status allows us to keep the status rows immutable and create an audit trail that can be traced backwards to follow all the states an entity passed through as each status change is logged as a new row in the status table. Previous rows in the status table are immutable ensuring historical integrity.
- Creating a type associated with the status allows us to define an enum with only the pre-defined statuses as acceptable values.
- Since a new row in the status table is created on each status change, we use a computed column on the associated entity's table to return the latest status row for that entity. The computed column is an SQL function that receives an entity as a parameter and returns either a query (set of values) or a value. Relay then uses this function to add the results of the computed column to the shape of the entity. This results in an easily accessible status column on the entity whose value is derived from the status table and is always the current status.

### Organize next.js pages according to roles

### Use Guard Clauses

# Testing

### Linting

### Database unit tests

### Components unit tests

### Integration tests

### End-to-end testing

End-to-end tests run the entire stack, from the UI to the database, in a production build, to ensure that the flow of the deployed application performs well from start to finish.

Our end-to-end tests are written using Cypress, which allows us to interact with the browser and test that the expected elements are being displayed. The Cypress tests and configurations are located in the app/cypress directory. Reading through the cypress core concepts guide is strongly recommended before starting to write tests ([https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Can-Be-Simple-Sometimes](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Can-Be-Simple-Sometimes))

#### Tools

- Cypress (https://www.cypress.io/)
- io (https://percy.io/)

#### Login flow and environment variables

Cypress allows developers to write custom commands (defined in app/cypress/support/commands.js). Two such commands that we implemented are cy.login(username, password) and cy.logout() . They allow us to log in the application using the Keycloak single-sign-on server deployed on Pathfinder. We created three test accounts on the realm used in this application, one for each user role.

A `cypress.env.json` file is available on the CAS Scrum team SharePoint (TODO: Should be moved to OpenShift). This file should be downloaded into the project&#39;s `app` folder. This file defines the username and passwords for the test users in environment variables, which can be retrieved using the cy.env(&#39;VAR_NAME&#39;) function.

#### Running end-to-end tests

- Start the database
- Deploy the development data using `.bin/deploy-data.sh -p -dev`
- Start the application using your favorite command. On CI, it will run it in production mode, with auth enabled. While developing, however, you can run `yarn dev NO_AUTH` in most cases
- The feature flag `yarn dev NO_MATHJAX AS_CYPRESS` is available for running Cypress tests
- These flags block mathjax components that often cause a false failed response from the e2e tests.
- Run `yarn cypress` to open the Cypress UI

#### Visual testing with Percy

Percy allow us to record screenshots of the application, using the `cy.percySnapshot()` method. Unless the tests are run using Percy, with `yarn test:e2e-snapshots`, which requires the PERCY_TOKEN environment variable to be defined (see the project settings here: [https://percy.io/bcgov-cas/cas-ciip-portal/settings](https://percy.io/bcgov-cas/cas-ciip-portal/settings)). Percy will be run on the CI server, once the end-to-end tests are successful, so you do not need to run them locally. Until the Percy GitHub integration is added in the bcgov org, our pull request review process will include a manual approval (see the Version Control, Mandatory peer review section).

#### Alternatives to Percy

We explored two alternatives to Percy:

- Using `cypress-plugin-snapshots` ([https://github.com/meinaart/cypress-plugin-snapshots](https://github.com/meinaart/cypress-plugin-snapshots)) and storing the files using Git LFS. The advantage is that developers can run snapshot tests and comparison locally. However, GitHub does not display the differences in the files stored with LFS in pull requests, which would make the review process difficult. Moreover, the LFS quota is for the entire organization.
- Applitools eyes ([https://applitools.com/](https://applitools.com/)) provides functionalities like Percy. However, its user interface isn&#39;t as intuitive, its API requires more configuration, and the GitHub integration isn&#39;t available with the free plan.

#### What to test with cypress

#### Data setup and teardown

#### Known Issues

- Cypress has an open issue[https://github.com/cypress-io/cypress/issues/4443] regarding dom snapshots and select tags where the value of the select is lost.

## Version Control

### Submodules

### GPG-signing

### Pre-commit

### Commit message templates &amp; changelog generation (conventional-changelog)

### Branching (trunk pattern)

### Branch protection rules

### Merging (rebase short-lived branches)

### Mandatory peer review

- Manual check on the Percy app before accepting a PR

### Issue/PR templates (coming soon to a repo near you)

### PR reviewing process
