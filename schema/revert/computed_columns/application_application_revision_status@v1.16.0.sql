-- Revert ggircs-portal:function_application_application_revision_status from pg

begin;

drop function ggircs_portal.application_application_revision_status(ggircs_portal.application, text);

commit;
