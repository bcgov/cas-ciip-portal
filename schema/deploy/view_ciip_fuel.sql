-- Deploy ggircs-portal:view_ciip_fuel to pg
-- requires: table_form_result

BEGIN;
  create view ggircs_portal.ciip_fuel as (
    with x as (
      select
        cast(id as text) as id,
        json_array_elements((form_result -> 'fuels')::json) as fuel_data
      from ggircs_portal.form_result
    )
    select
       x.id as application_id,
       (x.fuel_data ->> 'quantity')::numeric as quantity,
       x.fuel_data ->> 'fuel_type' as fuel_type,
       x.fuel_data ->> 'fuel_units' as fuel_units,
       x.fuel_data ->> 'methodology' as methodology,
       x.fuel_data ->> 'methodology-Comment' as methodology_comment,
       x.fuel_data ->> 'description' as description
    from x
 );

comment on view ggircs_portal.ciip_fuel is 'The view for fuel data reported in the application';
comment on column ggircs_portal.ciip_fuel.application_id is 'The application id used for reference and join';
comment on column ggircs_portal.ciip_fuel.quantity is 'The fuel quantity';
comment on column ggircs_portal.ciip_fuel.fuel_units is 'The fuel units';
comment on column ggircs_portal.ciip_fuel.fuel_type is 'The fuel type';
comment on column ggircs_portal.ciip_fuel.methodology is 'The methodology used for reporting';
comment on column ggircs_portal.ciip_fuel.methodology_comment is 'The methodology details if other';
comment on column ggircs_portal.ciip_fuel.description is 'The description of the fuel used';

COMMIT;

