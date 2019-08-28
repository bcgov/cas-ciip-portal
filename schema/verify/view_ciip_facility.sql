-- Verify ggircs-portal:view_ciip_facility on pg

BEGIN;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_facility', 'select');

ROLLBACK;
