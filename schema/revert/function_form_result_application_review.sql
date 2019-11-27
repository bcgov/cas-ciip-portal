-- Revert ggircs-portal:function_form_result_application_review from pg

begin;

drop function ggircs_portal.form_result_application_review(ggircs_portal.form_result);

commit;
