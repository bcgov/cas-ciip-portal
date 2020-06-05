-- Verify ggircs-portal:computed_columns/product_product_link on pg

begin;

select pg_get_functiondef('ggircs_portal.product_product_link(ggircs_portal.product)'::regprocedure);

rollback;
