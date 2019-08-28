-- Verify ggircs-portal:view_ciip_electricity_and_heat on pg

BEGIN;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_electricity_and_heat', 'select');

ROLLBACK;
