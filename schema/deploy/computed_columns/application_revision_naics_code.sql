-- Deploy ggircs-portal:computed_columns/application_revision_naics_code to pg
-- requires: tables/form_result
-- requires: tables/application_revision

begin;

create or replace function ggircs_portal.application_revision_naics_code(app ggircs_portal.application_revision)
  returns ggircs_portal.naics_code as
  $function$

      with x as (
        select ((form_result.form_result ->> 'operator')::json ->> 'naics')::varchar(1000) as naics
        from ggircs_portal.form_result
        join ggircs_portal.form_json
        on form_result.form_id = form_json.id
        and form_json.slug in ('admin', 'admin-2018')
        and form_result.application_id = 1
        and form_result.version_number = 1
      )
      select * from ggircs_portal.naics_code where naics_code = (select naics from x);

  $function$ language sql stable;

comment on function ggircs_portal.application_revision_naics_code(ggircs_portal.application_revision) is 'This computed column returns the associated naics_code table row for the application_revision passed in via the parameters';

commit;
