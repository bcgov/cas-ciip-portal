# Developer Guidelines

## Setting up the test data

The `schema/deploy-test-data.sh` script allows you to set up you database schemas, and populate it with dummy data.

### Prerequisites

- Start your postgres database (`pg_ctl start` if you installed it with `asdf`)
- Initialize the `schema/.cas-ggircs` [submodule] (`git submodule init && git submodule update`)

### Deploying the data

`make deploy_test_data` will drop the existing database if it exists and recreate it using the current deployment files.
The script itself can be run from the ciip portal root directory with:

- `./.bin/deploy-data.sh -dev`: deploy just the data to dev
- `./.bin/deploy-data.sh -p -dev`: revert & deploy with sqitch + deploy the data to dev
- `./.bin/deploy-data.sh -d -dev`: drop the database, create the database, deploy database entities with sqitch + deploy the data to dev

Run `./.bin/deploy-data.sh --help` to learn about available options.

### `ggircs_portal.current_timestamp()` in development and test mode

When deploying the `test` or `dev` data, the `ggircs_portal.current_timestamp()` function, which usually calls the `current_timestamp` Postgres function, if replaced by a mock that always return the timestamp where the 2018 CIIP application window opens. This allows developers and testers to test the application process even though the window is not open.

## Code style and Linting

We use [Eslint](https://eslint.org/) to lint the app's code and [Prettier](https://prettier.io/) to format it. The following yarn scripts can be used to trigger linting and formatting:

- `yarn lint`: Runs Eslint and prints all the errors and warnings
- `yarn format`: Reformats the code using Prettier

### VSCode plugin

The ESLint and Pretter VSCode plugins are recommended.
Adding the following setting to your VSCode workspace settings is required for the ESLint plugin to work:

```
"eslint.workingDirectories": ["app"]
```

## Testing

Tests on the database uses pg_prove, make sure pgtap is installed to run them or install with `make install pgtap` or `sudo apt install libtap-parser-sourcehandler-pgtap-perl`.

## User Authentication

The application requires users to be authenticated using keycloak. Authentication can be disabled by running `node server NO_AUTH` (or `yarn dev NO_AUTH`), which is the default behavior of `make watch`.

### Additional Flags

`AS_REPORTER`: Automatically log in as our test reporter
`AS_CERTIFIER`: Automatically log in as our test certifier
`AS_ANALYST`: Automatically log in as our test analyst
`AS_ADMIN`: Automatically log in as our test admin
`AS_PENDING`: Automatically log in as a pending analyst (pending approval via the Keycloak console to become an analyst)
`NO_MAIL`: Ignore all outgoing mail functionality (can be run by itself, or along with any other auth flags ie `yarn dev NO_AUTH NO_MAIL`)

## Unit and Integration Testing

### `react-test-renderer` vs `enzyme`

Depending on whether we're writing integration or unit tests, we use either `react-test-renderer` or `enzyme`, respectively, as our react testing library.
Here are some key differences between the two, found in [this beautiful post](https://github.com/internetarchive/iaux/issues/226#issue-463893174):

`react-test-renderer`

- It is a library for rendering React components to pure JavaScript objects, and for asserting the behaviour of our components.
- Shallow rendering has limitations (no ref support, no calling componentDidMount and componentDidUpdate) and react's own documentation recommends to use enzyme for the same purpose

`enzyme` :

- Adds some great additional utility methods for rendering a component (or multiple components), finding elements, and interacting with elements.
- Shallow rendering makes it useful to isolate the component for pure unit testing. It protects against changes or bugs in a child component which may alter the behaviour or output of the component under test. Additionally makes tests run faster.
- More readable code
- No need to test as many implementation details

### Sqitch

We manage our database with [sqitch] via the sqitch.plan in the `/schema` directory.
To add something to the database:

- `sqitch add <new database entity> --require <dependency for new entity> --set schema=<schema>` (--require can be repeated for many dependencies)
  To deploy changes:
- `sqitch deploy <Name of change>` (Name of change is optional, & deploys up to that change. If not set, it will deploy all changes)
  To roll back changes:
- `sqitch revert <Name of change>` (Name of change is optional, & reverts back to that change. If not set, it will revert all changes)

## Incremental Database changes

Releases are tagged in the sqitch plan, ex: `@v1.0.0-rc.7 2020-06-18T18:52:29Z Matthieu Foucault <matthieu@button.is> # release v1.0.0-rc.7`
Any database entities in the plan before a release are immutable and any changes to them must be done as follows:

### Tables (or other non-idempotent changes)

Changes to tables require creating a new entry in the sqitch plan for that table, for example:
`sqitch add tables/application_001 --require tables/application`
This will create a deploy,revert and verify files for tables/application_001

- In the deploy file, any necessary changes can be made to the table with `alter table`.
- In the revert file, any changes made in the deploy file must be undone, again with `alter table`
- The verify file should just verify the existence of the table, and can probably be the same as the original verify file

### Functions (or other idempotent changes)

Changes to functions are done via the `sqitch rework` command, which only works with idempotent changes, ie `create or replace function`.
example: `sqitch rework -c <NAME OF FILE TO BE CHANGED>`
This will create deploy, revert and verify files, for the changed item like so: `function_file_name@TAG.sql`
The `TAGGED` files should contain the original deploy, revert, verify code.
The `UNTAGGED` files will contain the changes:

- The deploy file will contain the updated function code
- The revert file will contain the original, (or in the case of several changes, the previous) function code to return the function to its previous state
- The verify file will likely be the same as the original verify file

[submodule]: https://git-scm.com/book/en/v2/Git-Tools-Submodules
[sqitch]: https://sqitch.org/docs/manual/sqitchtutorial/
