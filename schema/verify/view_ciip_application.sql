-- Verify ggircs-portal:view_ciip_application on pg

BEGIN;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_application', 'select');

ROLLBACK;
