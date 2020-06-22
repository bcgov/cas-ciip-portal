-- Verify ggircs-portal:trigger_functions/draft_application_started on pg

begin;

select pg_get_functiondef('ggircs_portal_private.draft_application_started()'::regprocedure);

rollback;
