-- Revert ggircs-portal:function_application_latest_submitted_version_number from pg

begin;

drop function ggircs_portal.application_latest_submitted_revision;

commit;
