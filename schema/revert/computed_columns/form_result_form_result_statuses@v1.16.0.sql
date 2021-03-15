-- Revert ggircs-portal:computed_columns/form_result_form_result_statuses from pg

begin;

drop function ggircs_portal.form_result_form_result_statuses;

commit;
