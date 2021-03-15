-- Deploy ggircs-portal:computed_columns/form_result_form_result_statuses to pg
-- requires: tables/form_result
-- requires: tables/form_result_status

begin;

  drop function ggircs_portal.form_result_form_result_statuses;

commit;
