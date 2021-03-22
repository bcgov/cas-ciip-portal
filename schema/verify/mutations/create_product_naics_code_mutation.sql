-- Verify ggircs-portal:mutations/create_product_naics_code_mutation on pg

begin;

select pg_get_functiondef('ggircs_portal.create_product_naics_code_mutation(int, int, boolean)'::regprocedure);

rollback;
