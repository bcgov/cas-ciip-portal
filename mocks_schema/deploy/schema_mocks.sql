-- Deploy mocks:schema_mocks to pg

BEGIN;

create schema mocks;
comment on schema mocks is 'A schema for mock functions that can be used for either tests or dev/test environments';

COMMIT;
