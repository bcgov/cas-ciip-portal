-- Deploy ggircs-portal:computed_columns/application_revision_emission_form_data to pg
-- requires: tables/application_revision
-- requires: tables/form_result

begin;

create or replace function ggircs_portal.application_revision_emission_form_data(app_revision ggircs_portal.application_revision)
    returns setof ggircs_portal.emission_form_data
as
$function$

with source_types as (
  select
    json_array_elements((form_result.form_result ->> 'sourceTypes')::json) as source_type,
    (form_result.form_result ->> 'comments')::varchar(10000) as comments
  from ggircs_portal.form_result
  join ggircs_portal.form_json
    on form_result.form_id = form_json.id
    and form_json.slug in ('emission', 'emission-2018')
    and form_result.application_id = app_revision.application_id
    and form_result.version_number = app_revision.version_number
), gases as (
  select
    (source_type ->> 'sourceTypeName')::varchar(1000)    as source_type_name,
    json_array_elements((source_type ->> 'gases')::json) as gases,
    comments
  from source_types
)
select
       source_type_name,
       (gases ->> 'gwp')::numeric            as gwp,
       (gases ->> 'gasType')::varchar(1000)  as gas_type,
       (gases ->> 'annualCO2e')::numeric     as annual_co2e,
       (gases ->> 'annualEmission')::numeric as annual_emission,
       (gases ->> 'gasDescription')::varchar(1000) as gas_description,
       comments
from gases;

$function$ language 'sql' stable;

grant execute on function ggircs_portal.application_revision_emission_form_data to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.application_revision_emission_form_data is 'Computed column returns the emission data as reported in a specific version of a CIIP (CleanBC Industrial Incentive Program) application';

commit;
