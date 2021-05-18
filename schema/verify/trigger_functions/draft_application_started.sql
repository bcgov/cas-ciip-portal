-- Verify ggircs-portal:trigger_functions/draft_application_started on pg

begin;

select ggircs_portal_private.verify_function_not_present('ggircs_portal_private.draft_application_started');

rollback;
