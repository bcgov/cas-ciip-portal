-- Deploy ggircs-portal:view_ciip_production to pg
-- requires: table_form_result

begin;
  create or replace view ggircs_portal.ciip_production as (
    with x as (
      select
         application_id, version_number,
         json_array_elements((form_result)::json) as production_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.slug = 'production'
    )
    select
       x.application_id,
       x.version_number,
       (x.production_data ->> 'productAmount')::numeric as productAmount,
       (x.production_data ->> 'productRowId')::integer as product_id,
       (x.production_data ->> 'productUnits')::varchar(1000) as product_units,
       (x.production_data ->> 'productEmissions')::numeric as product_emissions,
       (x.production_data ->> 'paymentAllocationFactor')::numeric as payment_allocation_factor,
       (x.production_data ->> 'additionalData')::jsonb as additional_data,
       (x.production_data ->> 'importedElectricityAllocationFactor')::numeric as imported_electricity_allocation_factor,
       (x.production_data ->> 'importedHeatAllocationFactor')::numeric as imported_heat_allocation_factor
    from x
 );

grant select on table ggircs_portal.ciip_production to ciip_administrator, ciip_analyst;

comment on view ggircs_portal.ciip_production is E'@omit\n The view for production data reported in the application';
comment on column ggircs_portal.ciip_production.application_id is 'The application id';
comment on column ggircs_portal.ciip_production.version_number is 'The application revision number';
comment on column ggircs_portal.ciip_production.productAmount is 'The production quantity';
comment on column ggircs_portal.ciip_production.product_id is 'The id of the product';
comment on column ggircs_portal.ciip_production.product_units is 'The units for the product';
comment on column ggircs_portal.ciip_production.product_emissions is 'The percentage of the facility''s total emission allocated to a product';
comment on column ggircs_portal.ciip_production.payment_allocation_factor is 'The percentage of the facility''s taxable emission allocated to a product';
comment on column ggircs_portal.ciip_production.additional_data is 'The product-specific additional data';
comment on column ggircs_portal.ciip_production.imported_electricity_allocation_factor is 'The percentage of the facility''s imported electricity for a product';
comment on column ggircs_portal.ciip_production.imported_heat_allocation_factor is 'The percentage of the facility''s imported heat for a product';

commit;
