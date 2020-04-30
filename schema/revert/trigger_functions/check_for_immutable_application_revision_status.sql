-- Revert ggircs-portal:trigger_functions/check_for_immutable_application_revision_status from pg

begin;

drop function ggircs_portal_private.check_for_immutable_application_revision_status;

commit;
