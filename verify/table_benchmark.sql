-- Verify ggircs-portal:table_benchmark on pg

BEGIN;

select pg_catalog.has_table_privilege('ggircs_portal.benchmark', 'select');

ROLLBACK;
