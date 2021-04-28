-- Deploy ggircs-portal:computed_columns/application_revision_fuel_form_data to pg
-- requires: tables/application_revision
-- requires: tables/form_result

begin;

create or replace function ggircs_portal.application_revision_fuel_form_data(app_revision ggircs_portal.application_revision)
    returns setof ggircs_portal.fuel_form_data
as
$function$

with x as (
      select
        json_array_elements((form_result)::json) as fuel_data,
        (form_result.form_result ->> 'comments')::varchar(10000) as comments
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.slug in ('fuel', 'fuel-2018')
      and form_result.application_id = app_revision.application_id
      and form_result.version_number = app_revision.version_number
    )
    select
       (x.fuel_data ->> 'quantity')::numeric as quantity,
       (x.fuel_data ->> 'fuelRowId')::integer as fuel_id,
       (x.fuel_data ->> 'fuelUnits')::varchar(1000) as fuel_units,
       (x.fuel_data ->> 'emissionCategoryRowId')::numeric as emission_category_id,
       (x.fuel_data ->> 'fuelType')::varchar(1000) as fuel_type,
       (x.fuel_data ->> 'fuelTypeAlt')::varchar(1000) as fuel_type_alt,
       (x.fuel_data ->> 'fuelDescription')::varchar(10000) as fuel_description,
       (x.fuel_data ->> 'associatedEmissions')::numeric as associated_emissions,
       x.comments
    from x

$function$ language 'sql' stable;

grant execute on function ggircs_portal.application_revision_fuel_form_data to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.application_revision_fuel_form_data is 'Computed column returns the fuel data as reported in a specific version of a CIIP (CleanBC Industrial Incentive Program) application';

commit;
