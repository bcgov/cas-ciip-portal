-- Revert ggircs-portal:function_application_previous_submitted_revision from pg

begin;

drop function ggircs_portal.application_previous_submitted_revision;

commit;
