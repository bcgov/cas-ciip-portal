-- Verify ggircs-portal:schema_ggircs_portal on pg

begin;

select pg_catalog.has_schema_privilege('ggircs_portal', 'usage');

rollback;
