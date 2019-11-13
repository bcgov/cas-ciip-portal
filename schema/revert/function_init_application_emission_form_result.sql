-- Revert ggircs-portal:function_init_application_emission_form_result from pg

begin;

drop function ggircs_portal.init_application_emission_form_result;

commit;
