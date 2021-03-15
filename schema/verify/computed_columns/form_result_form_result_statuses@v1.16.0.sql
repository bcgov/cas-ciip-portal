-- Verify ggircs-portal:computed_columns/form_result_form_result_statuses on pg

begin;

select pg_get_functiondef('ggircs_portal.form_result_form_result_statuses(ggircs_portal.form_result)'::regprocedure);

rollback;
