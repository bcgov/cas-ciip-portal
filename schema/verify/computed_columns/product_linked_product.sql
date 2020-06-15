-- Verify ggircs-portal:computed_columns/product_linked_product on pg

begin;

select pg_get_functiondef('ggircs_portal.product_linked_product(ggircs_portal.product)'::regprocedure);

rollback;
