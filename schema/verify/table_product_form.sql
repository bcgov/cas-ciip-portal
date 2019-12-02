-- Verify ggircs-portal:table_product_form on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.product_form', 'select');

rollback;
