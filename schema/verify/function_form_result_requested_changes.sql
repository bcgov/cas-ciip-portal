-- Verify ggircs-portal:function_requested_changes on pg

begin;

select pg_get_functiondef('ggircs_portal.form_result_requested_changes(ggircs_portal.form_result)'::regprocedure);

rollback;
