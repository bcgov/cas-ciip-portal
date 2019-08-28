-- Deploy ggircs-portal:view_ciip_production to pg
-- requires: table_form_result

BEGIN;
  create view ggircs_portal.ciip_production as (
    with x as (
      select
        id,
        json_array_elements((form_result -> 'module_throughput_and_production_data')::json) as production_data
      from ggircs_portal.form_result
    )
    select
       x.id as application_id,
       x.production_data ->> 'quantity' as quantity,
       x.production_data ->> 'fuel_type' as fuel_type,
       x.production_data ->> 'fuel_units' as fuel_units,
       x.production_data ->> 'comments' as comments,
       x.production_data ->> 'associated_emissions' as associated_emissions,
       x.production_data ->> 'attributable_fuel_percentage' as attributable_fuel_percentage
    from x
 );

comment on view ggircs_portal.ciip_production is 'The view for production data reported in the application';
comment on column ggircs_portal.ciip_production.application_id is 'The application id used for reference and join';
comment on column ggircs_portal.ciip_production.quantity is 'The production quantity';
comment on column ggircs_portal.ciip_production.fuel_units is 'The fuel units';
comment on column ggircs_portal.ciip_production.fuel_type is 'The fuel type';
comment on column ggircs_portal.ciip_production.comments is 'The comments';
comment on column ggircs_portal.ciip_production.associated_emissions is 'The methodology details if other';
comment on column ggircs_portal.ciip_production.attributable_fuel_percentage is 'The fuel percentage that can be attributed to incentive';

COMMIT;
