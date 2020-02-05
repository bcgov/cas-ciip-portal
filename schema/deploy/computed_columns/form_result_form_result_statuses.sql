-- Deploy ggircs-portal:computed_columns/form_result_form_result_statuses to pg
-- requires: tables/form_result
-- requires: tables/form_result_status

begin;

  create or replace function ggircs_portal.form_result_form_result_statuses(form_result ggircs_portal.form_result)
  returns ggircs_portal.form_result_status
  as
  $body$
    declare
      result ggircs_portal.form_result_status;
    begin

      select * from ggircs_portal.form_result_status
      where application_id = form_result.application_id
      and form_id = form_result.form_id
      order by created_at DESC
      limit 1 into result;

      return result;

    end;
  $body$
  language 'plpgsql' stable;

grant execute on function ggircs_portal.form_result_form_result_statuses to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

commit;
