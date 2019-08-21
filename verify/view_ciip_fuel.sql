-- Verify ggircs-portal:view_ciip_fuel on pg

BEGIN;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_fuel', 'select');

ROLLBACK;
