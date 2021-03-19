-- Revert ggircs-portal:function_application_revision_application_revision_status from pg

begin;

drop function ggircs_portal.application_revision_application_revision_status;

commit;
