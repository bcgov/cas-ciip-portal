-- Verify test_helpers:schema_test_helper on pg

begin;

select pg_catalog.has_schema_privilege('test_helper', 'usage');

rollback;
