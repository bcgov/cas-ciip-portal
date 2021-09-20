-- Revert ggircs-portal:trigger_functions/restrict_old_application_submission from pg

begin;

drop function ggircs_portal_private.restrict_old_application_submission;

commit;
