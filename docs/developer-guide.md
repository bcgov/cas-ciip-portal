# Developer Guidelines

## Setting up the test data

The `schema/deploy-test-data.sh` script allows you to set up you database schemas, and populate it with dummy data.

### Prerequisites
- Start your postgres database (`pg_ctl start` if you installed it with `asdf`)
- Initialize the `schema/.cas-ggircs` [submodule] (`git submodule init && git submodule update`)

### Deploying the data

`make deploy_test_data` will drop the existing database if it exists and recreate it using the current deployment files.
The script itself can be run from the ciip portal root directory with:
  - `./.bin/deploy-data.sh -dev`: deploy just the data
  - `./.bin/deploy-data.sh -p -dev`: revert & deploy with sqitch + deploy the data
  - `./.bin/deploy-data.sh -d -dev`: drop the databse, create the databse, deploy database entities with sqitch + deploy the data

Run `./.bin/deploy-data.sh --help` to learn about available options.


### `ggircs_portal.current_timestamp()` in development and test mode

When deploying the `test` or `dev` data, the `ggircs_portal.current_timestamp()` function, which usually calls the `current_timestamp` Postgres function, if replaced by a mock that always return the timestamp where the 2018 CIIP application window opens. This allows developers and testers to test the application process even though the window is not open.


## Code style and Linting

We use [XO](https://github.com/xojs/xo) to lint the app's code. The following yarn scripts can be used to trigger formatting and linting:

 - `yarn lint`: Runs xo and prints all the errors and warnings
 - `yarn format`: Same as above, but also reformats the code using Prettier

### VSCode plugin

The `linter-xo-2` VSCode add XO support. The following VSCode settings will enable XO and make sure you code is properly formatted whenever you save a file:

```json
{
    "xo.enable": true,
    "xo.format.enable": true,
    "editor.formatOnSave": true
}
```
## Testing

Tests on the database uses pg_prove, make sure pgtap is installed to run them or install with `make install pgtap` or `sudo apt install libtap-parser-sourcehandler-pgtap-perl`.

## Pre-commit hooks

The Yelp [pre-commit](https://pre-commit.com) framework is configured for this project
to automatically dispatch multi-language pre-commit hooks. Wherever possible,
non-destructive linting steps will automatically fix common errors in staged code
either when explicitly running `pre-commit` or automatically via the
[git hook](https://git-scm.com/docs/githooks).

Installation:
- `asdf plugin-list` If any of the `yarn` `nodejs` `postgres` & `python` plugins are not listed install with asdf plugin-add <plugin>
- `asdf install` (grab the python version specified in `.tool-versions`...but any python should do)
- `pip install -r requirements.txt` (install pre-commit via pip...mac users might prefer homebrew)
- `asdf reshim` (ensure all pip-installed tools are available on the path...ignore if using system python)
- `pre-commit install` (create the `.git/hooks/pre-commit` file to run pre-commit automatically)
- `pre-commit install --hook-type commit-msg` (create the `.git/hooks/commit-msg` file to check commit message format automatically)
- If pre-commit install fails, try installing sqlite3 with `sudo apt-get install libsqlite3-dev` then `asdf uninstall python` then `asdf install`

## Committing

This project includes a [commitizen](https://github.com/commitizen/cz-cli) configuration
to facilitate conformance with the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

Run `make commit` to use the `git commit` wrapper that ensures your commit messages are well-formed.

## Filesystem Watchers

We use [Watchman] to recursively monitor our directory trees and dispatch
lifecycle jobs as needed. We define triggers using the [extended json syntax]
and commit these configuration files to the project. To start all triggers, run
`make watch` and to stop watching run `make unwatch`.

The logs for all watched processes can be found in the `logs/` directory, and
are overwritten on each restart of the triggered process. Certain additional
state files are also stored in this folder. Notably, `sqitch.status` records
the change hash currently deployed via watchman trigger to the local database
and `server.pid` records the process id of the node app server run via watchman.

To easily monitor all of the log files, you can use a program such as [multitail]. For instance, if you want to output all of the `sdtdout` files in your terminal, split into two columns, you can do the following:
`$ multitail -f -s 2 *.stdout.log`

Running `make unwatch` will stop both the node app server and the asdf-managed
local postgres server.

## User Authentication

The application requires users to be authenticated using keycloak. Authentication can be disabled by running `node server NO_AUTH` (or `yarn dev NO_AUTH`), which is the default behavior of `make watch`.

### Additional Flags

`AS_REPORTER`: Automatically log in as our test reporter
`AS_ANALYST`: Automatically log in as our test analyst
`AS_ADMIN`: Automatically log in as our test admin
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



[Watchman]: https://facebook.github.io/watchman/
[extended json syntax]: https://facebook.github.io/watchman/docs/cmd/trigger.html#extended-syntax
[multitail]: https://linux.die.net/man/1/multitail
[submodule]: https://git-scm.com/book/en/v2/Git-Tools-Submodules
