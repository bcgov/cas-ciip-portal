-- Verify ggircs-portal:view_ciip_certifier on pg

BEGIN;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_certifier', 'select');

ROLLBACK;
