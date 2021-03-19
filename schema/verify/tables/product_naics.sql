-- Verify ggircs-portal:tables/product-naics on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.product_naics', 'select');

rollback;
