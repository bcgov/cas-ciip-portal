-- Verify ggircs-portal:computed_columns/product_current_benchmark on pg

begin;

select pg_get_functiondef('ggircs_portal.product_current_benchmark(ggircs_portal.product)'::regprocedure);

rollback;
