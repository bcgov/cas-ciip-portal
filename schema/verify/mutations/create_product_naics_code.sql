-- Verify ggircs-portal:mutations/create_product_naics_code on pg

begin;

select pg_get_functiondef('ggircs_portal.create_product_naics_code(int, int, boolean)'::regprocedure);

rollback;
