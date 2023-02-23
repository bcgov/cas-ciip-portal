-- Deploy ggircs-portal:view_ciip_fuel to pg
-- requires: table_form_result

begin;
  create or replace view ggircs_portal.ciip_fuel as (
    with x as (
      select
        form_result.application_id,
        form_result.version_number,
        json_array_elements((form_result)::json) as fuel_data,
        (form_result.form_result ->> 'comments')::varchar(10000) as comments
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.slug in ('fuel', 'fuel-2018')
    )
    select
       x.application_id,
       x.version_number,
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
 );

grant select on table ggircs_portal.ciip_fuel to ciip_administrator, ciip_analyst;

comment on view ggircs_portal.ciip_fuel is E'@omit\n The view for fuel data reported in the application';
comment on column ggircs_portal.ciip_fuel.application_id is 'The application id';
comment on column ggircs_portal.ciip_fuel.version_number is 'The application revision number';
comment on column ggircs_portal.ciip_fuel.quantity is 'The fuel quantity';
comment on column ggircs_portal.ciip_fuel.fuel_units is 'The fuel units';
comment on column ggircs_portal.ciip_fuel.fuel_id is 'The id of the fuel';
comment on column ggircs_portal.ciip_fuel.emission_category_id is 'The foreign key to the emission_category table, defines what emission category the fuel belongs to';
comment on column ggircs_portal.ciip_fuel.fuel_type is 'The type(name) of fuel combusted';
comment on column ggircs_portal.ciip_fuel.fuel_type_alt is 'Alternative name for type of fuel combusted';
comment on column ggircs_portal.ciip_fuel.fuel_description is 'A description of the fuel comubsted';
comment on column ggircs_portal.ciip_fuel.associated_emissions is 'The quantity of emissions associated with the fuel combusted';
comment on column ggircs_portal.ciip_fuel.associated_emissions is 'The quantity of emissions associated with the fuel combusted';
comment on column ggircs_portal.ciip_fuel.comments is 'Any comments the reporter added to this form while filling it out';


commit;
