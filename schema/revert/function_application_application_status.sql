-- Revert ggircs-portal:function_application_application_status from pg

begin;

drop function ggircs_portal.application_application_status(ggircs_portal.application);

commit;
