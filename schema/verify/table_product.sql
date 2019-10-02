-- Verify ggircs-portal:product on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.product', 'select');

rollback;
