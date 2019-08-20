-- Verify ggircs-portal:table_product_benchmark on pg

BEGIN;

select pg_catalog.has_table_privilege('ggircs_portal.product_benchmark', 'select');

ROLLBACK;
