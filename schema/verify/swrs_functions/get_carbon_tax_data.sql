-- Verify ggircs-portal:function_get_carbon_tax_data on pg

begin;

select pg_get_functiondef('ggircs_portal.get_carbon_tax_data()'::regprocedure);

rollback;
