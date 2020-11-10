# Database mocks schema

## Function

The mocks schema allows developers to mock standard database functions such as `now()` and provide alternative implementations.

## Operation

This works by creating a `mocks` schema in which we implement the overloads for the target database functions.
<br>
We can then set the postgres `search_path` to use this schema before the standard postgres catalog, e.g.

> `set search_path=mocks,pg_catalog,public;`

or

> `set_config('search_path','mocks,pg_catalog,public', true);`

## Deploying the test-helper schema

The mocks schema is deployed automatically for pgTap tests, the make target `make unit` deploys the schema & functions to the test db. The schema is also deployed by CI to the dev db in order to run the cypress e2e tests.

For running e2e tests locally, the schema must be deployed manually. This can be done with:

> `$ cd ./mocks_schema`
<br>
> `$ SQITCH_TARGET="ciip_portal_dev" sqitch deploy`


## Currently mocked functions

### `now()`
checks for a setting (https://www.postgresql.org/docs/12/config-setting.html) named `mocks.current_timestamp` conaining a Unix Epoch value, and returns that value if set. If `mocks.current_timestamp` is not set, the mock calls the default `pg_catalog.now()`.
