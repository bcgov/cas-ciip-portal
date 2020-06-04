-- Revert ggircs-portal:trigger_functions/draft_application_started from pg

begin;

drop function ggircs_portal_private.draft_application_started;

commit;
