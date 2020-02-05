-- Deploy ggircs-portal:function_application_ordered_form_results to pg
-- requires: table_application
-- requires: table_form_result
-- requires: table_ciip_application_wizard

begin;

  create or replace function ggircs_portal.application_ordered_form_results(
    application ggircs_portal.application, version_number_input text
  )
  returns setof ggircs_portal.form_result
  as
  $body$
    declare
    begin
        return query (
          with application_results as (select * from ggircs_portal.form_result
          where form_result.application_id = application.id and form_result.version_number = version_number_input::int)
            select application_results.* from application_results
              join ggircs_portal.ciip_application_wizard as wizard
              on wizard.form_id = application_results.form_id
              order by wizard.form_position
        );
    end;
  $body$
  language 'plpgsql' stable;

  grant execute on function ggircs_portal.application_ordered_form_results to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

commit;
