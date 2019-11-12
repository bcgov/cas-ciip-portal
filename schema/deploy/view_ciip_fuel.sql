-- Deploy ggircs-portal:view_ciip_fuel to pg
-- requires: table_form_result

begin;
  create view ggircs_portal.ciip_fuel as (
    with x as (
      select
        form_result.application_id as id,
        json_array_elements((form_result -> 'fuels')::json) as fuel_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.name = 'Fuel'
    )
    select
       x.id,
       (x.fuel_data ->> 'quantity')::numeric as quantity,
       (x.fuel_data ->> 'fuelType')::varchar(1000) as fuel_type,
       (x.fuel_data ->> 'fuelUnits')::varchar(1000) as fuel_units,
       (x.fuel_data ->> 'methodology')::varchar(1000) as methodology,
       (x.fuel_data ->> 'methodology-Comment')::varchar(10000) as methodology_comment,
       (x.fuel_data ->> 'description')::varchar(10000) as description
    from x
 );

-- Postgraphile smart-comments: These comments allow Postgraphile to infer relations between views
-- as though they were tables (ie faking a primary key in order to create an ID! type)
comment on view ggircs_portal.ciip_fuel is E'@primaryKey id';

-- TODO(Dylan): Regular comments are interfering with postgraphile smart comments.
-- comment on view ggircs_portal.ciip_fuel is 'The view for fuel data reported in the application';
-- comment on column ggircs_portal.ciip_fuel.application_id is 'The application id used for reference and join';
-- comment on column ggircs_portal.ciip_fuel.quantity is 'The fuel quantity';
-- comment on column ggircs_portal.ciip_fuel.fuel_units is 'The fuel units';
-- comment on column ggircs_portal.ciip_fuel.fuel_type is 'The fuel type';
-- comment on column ggircs_portal.ciip_fuel.methodology is 'The methodology used for reporting';
-- comment on column ggircs_portal.ciip_fuel.methodology_comment is 'The methodology details if other';
-- comment on column ggircs_portal.ciip_fuel.description is 'The description of the fuel used';

commit;
