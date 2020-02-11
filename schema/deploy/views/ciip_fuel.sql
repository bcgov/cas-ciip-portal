-- Deploy ggircs-portal:view_ciip_fuel to pg
-- requires: table_form_result

begin;
  create view ggircs_portal.ciip_fuel as (
    with x as (
      select
        form_result.application_id,
        form_result.version_number,
        json_array_elements((form_result)::json) as fuel_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.slug = 'fuel'
    )
    select
       x.application_id,
       x.version_number,
       (x.fuel_data ->> 'quantity')::numeric as quantity,
       (x.fuel_data ->> 'fuelType')::varchar(1000) as fuel_type,
       (x.fuel_data ->> 'fuelUnits')::varchar(1000) as fuel_units,
       (x.fuel_data ->> 'methodology')::varchar(1000) as methodology
    from x
 );

grant select on table ggircs_portal.ciip_fuel to ciip_administrator, ciip_analyst;

comment on view ggircs_portal.ciip_fuel is E'@omit\n The view for fuel data reported in the application';
comment on column ggircs_portal.ciip_fuel.application_id is 'The application id';
comment on column ggircs_portal.ciip_fuel.version_number is 'The application revision number';
comment on column ggircs_portal.ciip_fuel.quantity is 'The fuel quantity';
comment on column ggircs_portal.ciip_fuel.fuel_units is 'The fuel units';
comment on column ggircs_portal.ciip_fuel.fuel_type is 'The fuel type';
comment on column ggircs_portal.ciip_fuel.methodology is 'The methodology used for reporting';

commit;
