-- Verify ggircs-portal:view_ciip_application on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_application', 'select');

rollback;
