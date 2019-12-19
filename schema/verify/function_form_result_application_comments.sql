-- Verify ggircs-portal:function_form_result_application_comments on pg

BEGIN;

select pg_get_functiondef('ggircs_portal.form_result_application_comments(ggircs_portal.form_result)'::regprocedure);

ROLLBACK;
