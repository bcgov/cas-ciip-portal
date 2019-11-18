-- Deploy ggircs-portal:view_ciip_electricity_and_heat to pg
-- requires: table_form_result

begin;

  create view ggircs_portal.ciip_electricity_and_heat as (
    (
    with x as (
      select
        form_result.application_id as id,
            (form_result)::json -> 'heat' as heat_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.name = 'Electricity and Heat'
    )
    select
       x.id,
       (x.heat_data ->> 'sold')::numeric as sold,
       (x.heat_data ->> 'purchased')::numeric as purchased,
       (x.heat_data ->> 'consumedOnsite')::numeric as consumed_onsite,
       (x.heat_data ->> 'generatedOnsite')::numeric as generated_onsite,
       (x.heat_data ->> 'onSiteEmissions')::numeric as onsite_emissions,
       ('heat')::varchar(1000) as consumption_type
       -- add heat address to address view
    from x
    )
    union
    (
    with x as (
      select
        form_result.application_id as id,
            (form_result)::json -> 'electricity' as electricity_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.name = 'Electricity and Heat'
    )
    select
       x.id,
       (x.electricity_data ->> 'sold')::numeric as sold,
       (x.electricity_data ->> 'purchased')::numeric as purchased,
       (x.electricity_data ->> 'consumedOnsite')::numeric as consumed_onsite,
       (x.electricity_data ->> 'generatedOnsite')::numeric as generated_onsite,
       (x.electricity_data ->> 'onSiteEmissions')::numeric as onsite_emissions,
       ('electricity')::varchar(1000) as consumption_type
       -- add heat address to address view
    from x
    )
 );

-- Postgraphile smart-comments: These comments allow Postgraphile to infer relations between views
-- as though they were tables (ie faking a primary key in order to create an ID! type)
comment on view ggircs_portal.ciip_electricity_and_heat is E'@primaryKey id';

-- TODO(Dylan): Regular comments are interfering with postgraphile smart comments.
-- comment on view ggircs_portal.ciip_electricity_and_heat is 'The view for electricity and heat data reported in the application';
-- comment on column ggircs_portal.ciip_electricity_and_heat.application_id is 'The application id used for reference and join';
-- comment on column ggircs_portal.ciip_electricity_and_heat.sold is 'The amount of heat/electricity sold';
-- comment on column ggircs_portal.ciip_electricity_and_heat.purchased is 'The amount of heat/electricity purchased';
-- comment on column ggircs_portal.ciip_electricity_and_heat.consumed_onsite is 'The heat/electricity used on site';
-- comment on column ggircs_portal.ciip_electricity_and_heat.generated_onsite is 'The heat/electricity generated on site';
-- comment on column ggircs_portal.ciip_electricity_and_heat.generated_onsite is 'The quantity of emissions from generating heat/electricity';

commit;
