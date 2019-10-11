-- Verify ggircs-portal:table_benchmark on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.benchmark', 'select');

rollback;
