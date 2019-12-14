-- Verify ggircs-portal:view_ciip_emissions on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_emission', 'select');

rollback;
