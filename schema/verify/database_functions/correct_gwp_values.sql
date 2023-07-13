-- Verify ggircs-portal:database_functions/correct_gwp_values on pg

begin;

select pg_get_functiondef('ggircs_portal_private.correct_gwp_values()'::regprocedure);

rollback;
