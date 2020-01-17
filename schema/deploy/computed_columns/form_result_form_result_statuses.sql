-- Deploy ggircs-portal:computed_columns/form_result_form_result_statuses to pg
-- requires: tables/form_result
-- requires: tables/form_result_status

begin;

  create or replace function ggircs_portal.form_result_form_result_statuses(form_result ggircs_portal.form_result)
  returns setof ggircs_portal.form_result_status
  as
  $body$
    declare
    begin
        return query(
          select * from ggircs_portal.form_result_status
          where application_id = form_result.application_id
          and form_id = form_result.form_id
        );
    end;
  $body$
  language 'plpgsql' stable;

commit;
