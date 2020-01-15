-- Verify ggircs-portal:computer_columns/form_result_requested_change_comments on pg

begin;

select pg_get_functiondef('ggircs_portal.form_result_requested_change_comments(ggircs_portal.form_result)'::regprocedure);

rollback;
