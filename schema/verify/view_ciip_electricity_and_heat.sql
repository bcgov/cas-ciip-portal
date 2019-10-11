-- Verify ggircs-portal:view_ciip_electricity_and_heat on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_electricity_and_heat', 'select');

rollback;
