-- Verify ggircs-portal:product on pg

BEGIN;

select pg_catalog.has_table_privilege('ggircs_portal.product', 'select');

ROLLBACK;
