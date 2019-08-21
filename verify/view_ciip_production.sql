-- Verify ggircs-portal:view_ciip_production on pg

BEGIN;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_production', 'select');

ROLLBACK;
