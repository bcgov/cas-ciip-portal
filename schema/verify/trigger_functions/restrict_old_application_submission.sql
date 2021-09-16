-- Verify ggircs-portal:trigger_functions/restrict_old_application_submission on pg

begin;

select pg_get_functiondef('ggircs_portal_private.restrict_old_application_submission()'::regprocedure);

rollback;
