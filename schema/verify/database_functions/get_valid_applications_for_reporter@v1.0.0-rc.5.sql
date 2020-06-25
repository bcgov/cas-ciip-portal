-- Verify ggircs-portal:database_functions/get_valid_applications_for_reporter on pg

begin;

select pg_get_functiondef('ggircs_portal_private.get_valid_applications_for_reporter()'::regprocedure);

rollback;
