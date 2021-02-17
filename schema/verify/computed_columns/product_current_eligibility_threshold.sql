-- Verify ggircs-portal:computed_columns/product_current_eligibility_threshold on pg

begin;

select pg_get_functiondef('ggircs_portal.product_current_eligibility_threshold(ggircs_portal.product)'::regprocedure);

rollback;
