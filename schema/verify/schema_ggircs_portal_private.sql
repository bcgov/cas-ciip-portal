-- Verify ggircs-portal:schema_ggircs_portal_private on pg

begin;

select pg_catalog.has_schema_privilege('ggircs_portal_private', 'usage');

rollback;
