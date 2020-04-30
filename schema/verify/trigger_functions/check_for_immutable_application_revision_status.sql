-- Verify ggircs-portal:trigger_functions/check_for_immutable_application_revision_status on pg

begin;

select pg_get_functiondef('ggircs_portal_private.check_for_immutable_application_revision_status()'::regprocedure);

rollback;
