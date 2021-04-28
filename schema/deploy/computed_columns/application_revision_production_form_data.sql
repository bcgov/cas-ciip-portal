-- Deploy ggircs-portal:computed_columns/application_revision_production_form_data to pg
-- requires: tables/application_revision
-- requires: tables/form_result

begin;

create or replace function ggircs_portal.application_revision_production_form_data(app_revision ggircs_portal.application_revision)
    returns setof ggircs_portal.production_form_data
as
$function$

with x as (
      select
         json_array_elements((form_result)::json) as production_data,
         (form_result.form_result ->> 'comments')::varchar(10000) as comments
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.slug in ('production', 'production-2018')
      and form_result.application_id = app_revision.application_id
      and form_result.version_number = app_revision.version_number
    )
    select
       coalesce((x.production_data ->> 'productAmount')::numeric, (x.production_data ->> 'quantity')::numeric) as product_amount,
       (x.production_data ->> 'productRowId')::integer as product_id,
       coalesce((x.production_data ->> 'productUnits')::varchar(1000), (x.production_data ->> 'units')::varchar(1000)) as product_units,
       (x.production_data ->> 'productEmissions')::numeric as product_emissions,
       (x.production_data ->> 'requiresEmissionAllocation')::boolean as requires_emission_allocation,
       (x.production_data ->> 'isEnergyProduct')::boolean as is_energy_product,
       (x.production_data ->> 'productName')::varchar(1000) as product_name,
       (x.production_data ->> 'associatedEmissions')::numeric as associated_emissions,
       x.comments

    from x

$function$ language 'sql' stable;

grant execute on function ggircs_portal.application_revision_production_form_data to ciip_administrator, ciip_analyst, ciip_industry_user;

comment on function ggircs_portal.application_revision_production_form_data is 'Computed column returns the production data as reported in a specific version of a CIIP (CleanBC Industrial Incentive Program) application';

commit;
