-- Verify ggircs-portal:function_form_result_application_review on pg

begin;

select pg_get_functiondef('ggircs_portal.form_result_application_review(ggircs_portal.form_result)'::regprocedure);

rollback;
