-- Verify ggircs-portal:tables/gas_002_ar5_gwp on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.gas', 'select');

rollback;
