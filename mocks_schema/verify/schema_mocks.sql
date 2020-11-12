-- Verify mocks:schema_mocks on pg

BEGIN;

select pg_catalog.has_schema_privilege('mocks', 'usage');

ROLLBACK;
