-- Verify ggircs-portal:database_functions/correct_annual_co2e_values on pg

begin;

select pg_get_functiondef('ggircs_portal_private.correct_annual_co2e_values()'::regprocedure);

rollback;
