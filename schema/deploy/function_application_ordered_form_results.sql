-- Deploy ggircs-portal:function_application_ordered_form_results to pg
-- requires: table_application
-- requires: table_form_result
-- requires: table_ciip_application_wizard

begin;

  create or replace function ggircs_portal.application_ordered_form_results(
    application ggircs_portal.application
  )
  returns setof ggircs_portal.form_result
  as
  $body$
    declare
    begin
        return query (
          with application_results as (select * from ggircs_portal.form_result
          where form_result.application_id = application.id)
            select application_results.* from application_results
              join ggircs_portal.ciip_application_wizard as wizard
              on wizard.form_id = application_results.form_id
              order by wizard.form_position
        );
    end;
  $body$
  language 'plpgsql' stable;
commit;
