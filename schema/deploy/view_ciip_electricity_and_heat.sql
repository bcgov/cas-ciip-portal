-- Deploy ggircs-portal:view_ciip_electricity_and_heat to pg
-- requires: table_form_result

begin;

  create view ggircs_portal.ciip_electricity_and_heat as (
    (
    with x as (
      select
        cast(form_result.id as text) as id,
        form_result.application_id,
        json_array_elements(
          (json_array_elements(
            ((form_result -> 'electricity_and_heat'))::json
           ) -> 'heat')::json
        ) as heat_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.name = 'Electricity and Heat'
    )
    select
       x.id,
       x.application_id,
       (x.heat_data ->> 'sold')::numeric as sold,
       (x.heat_data ->> 'quantity')::numeric as quantity,
       x.heat_data ->> 'description' as description,
       x.heat_data ->> 'consumed_onsite' as consumed_onsite,
       x.heat_data ->> 'generated_onsite' as generated_onsite,
       'heat' as consumption_type
       -- add heat address to address view
    from x
    )
    union
    (
    with x as (
      select
        cast(form_result.id as text) as id,
        form_result.application_id,
        json_array_elements(
          (json_array_elements(
            ((form_result -> 'electricity_and_heat'))::json
           ) -> 'electricity')::json
        ) as electricity_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.name = 'Electricity and Heat'
    )
    select
       x.id,
       x.application_id,
       (x.electricity_data ->> 'sold')::numeric as sold,
       (x.electricity_data ->> 'quantity')::numeric as quantity,
       x.electricity_data ->> 'description' as description,
       x.electricity_data ->> 'consumed_onsite' as consumed_onsite,
       x.electricity_data ->> 'generated_onsite' as generated_onsite,
       'electricity' as consumption_type
       -- add heat address to address view
    from x
    )
 );
>>>>>>> updated the deploy files to receive the application_id foreign key

-- Postgraphile smart-comments: These comments allow Postgraphile to infer relations between views
-- as though they were tables (ie faking a primary key in order to create an ID! type)
comment on view ggircs_portal.ciip_electricity_and_heat is E'@primaryKey id';

-- TODO(Dylan): Regular comments are interfering with postgraphile smart comments.
-- comment on view ggircs_portal.ciip_electricity_and_heat is 'The view for electricity and heat data reported in the application';
-- comment on column ggircs_portal.ciip_electricity_and_heat.sold is 'The application id used for reference and join';
-- comment on column ggircs_portal.ciip_electricity_and_heat.quantity is 'The heat quantity';
-- comment on column ggircs_portal.ciip_electricity_and_heat.description is 'The heat position';
-- comment on column ggircs_portal.ciip_electricity_and_heat.generated_onsite is 'The last name of the heat';

commit;



