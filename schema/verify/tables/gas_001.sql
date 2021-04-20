-- Verify ggircs-portal:tables/gas_001 on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.gas', 'select');

rollback;
