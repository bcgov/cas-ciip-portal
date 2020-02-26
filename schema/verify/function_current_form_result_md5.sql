-- Verify ggircs-portal:function_current_form_result_md5 on pg

begin;

select pg_get_functiondef('ggircs_portal_private.current_form_results_md5(int, int)'::regprocedure);

rollback;
