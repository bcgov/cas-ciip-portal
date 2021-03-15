-- Verify ggircs-portal:database_functions/get_valid_applications_for_certifier on pg

begin;

select pg_get_functiondef('ggircs_portal_private.get_valid_applications_for_certifier()'::regprocedure);

rollback;
