-- Verify ggircs-portal:function_form_result_has_unresolved_comments on pg

begin;

select pg_get_functiondef('ggircs_portal.form_result_has_unresolved_comments(ggircs_portal.form_result)'::regprocedure);

rollback;
