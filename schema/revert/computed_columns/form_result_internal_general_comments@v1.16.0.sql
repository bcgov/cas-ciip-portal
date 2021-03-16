-- Revert ggircs-portal:function_form_result_application_comments from pg

begin;

drop function ggircs_portal.form_result_internal_general_comments;

commit;
