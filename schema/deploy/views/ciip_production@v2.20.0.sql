-- Deploy ggircs-portal:view_ciip_production to pg
-- requires: table_form_result

begin;
  create or replace view ggircs_portal.ciip_production as (
    with x as (
      select
         application_id, version_number,
         json_array_elements((form_result)::json) as production_data,
         (form_result.form_result ->> 'comments')::varchar(10000) as comments
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.slug in ('production', 'production-2018')
    )
    select
       x.application_id,
       x.version_number,
       coalesce((x.production_data ->> 'productAmount')::numeric, (x.production_data ->> 'quantity')::numeric) as product_amount,
       (x.production_data ->> 'productRowId')::integer as product_id,
       coalesce((x.production_data ->> 'productUnits')::varchar(1000), (x.production_data ->> 'units')::varchar(1000)) as product_units,
       (x.production_data ->> 'productEmissions')::numeric as product_emissions,
       (x.production_data ->> 'requiresEmissionAllocation')::boolean as requires_emission_allocation,
       (x.production_data ->> 'isEnergyProduct')::boolean as is_energy_product,
       (x.production_data ->> 'productName')::varchar(1000) as product_name,
       (x.production_data ->> 'associatedEmissions')::numeric as associated_emissions,
       (x.production_data ->> 'comments')::varchar(10000) as comments

    from x
 );

grant select on table ggircs_portal.ciip_production to ciip_administrator, ciip_analyst;

comment on view ggircs_portal.ciip_production is E'@omit\n The view for production data reported in the application';
comment on column ggircs_portal.ciip_production.application_id is 'The application id';
comment on column ggircs_portal.ciip_production.version_number is 'The application revision number';
comment on column ggircs_portal.ciip_production.product_amount is 'The yearly amount for the product';
comment on column ggircs_portal.ciip_production.product_id is 'The id of the product';
comment on column ggircs_portal.ciip_production.product_units is 'The units for the product';
comment on column ggircs_portal.ciip_production.product_emissions is 'The amount of emissions, in tCO2e, allocated to the product';
comment on column ggircs_portal.ciip_production.requires_emission_allocation is 'Whether or not the product requires reporting an emission allocation';
comment on column ggircs_portal.ciip_production.is_energy_product is 'Boolean value indicates if the product is an energy product that is reported alongside other products';
comment on column ggircs_portal.ciip_production.product_name is 'The name of the product';
comment on column ggircs_portal.ciip_production.associated_emissions is 'The emissions associated with the manufacturing of this product';
comment on column ggircs_portal.ciip_production.comments is 'Any comments the reporter added to this form while filling it out';

commit;
