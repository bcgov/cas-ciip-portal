-- Verify ggircs-portal:schema_swrs on pg

begin;

select pg_catalog.has_schema_privilege('swrs', 'usage');

rollback;
