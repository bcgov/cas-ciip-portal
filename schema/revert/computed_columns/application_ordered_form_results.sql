-- Revert ggircs-portal:function_application_ordered_form_results from pg

begin;

drop function ggircs_portal.application_ordered_form_results;

commit;
