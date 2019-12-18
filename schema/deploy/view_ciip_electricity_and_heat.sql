-- Deploy ggircs-portal:view_ciip_electricity_and_heat to pg
-- requires: table_form_result

begin;

  create view ggircs_portal.ciip_electricity_and_heat as (
    (
    with x as (
      select
        form_result.application_id,
        form_result.version_number,
            (form_result)::json -> 'heat' as heat_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.slug = 'electricity-and-heat'
    )
    select
       x.application_id,
       x.version_number,
       (x.heat_data ->> 'sold')::numeric as sold,
       (x.heat_data ->> 'purchased')::numeric as purchased,
       (x.heat_data ->> 'consumedOnsite')::numeric as consumed_onsite,
       (x.heat_data ->> 'generatedOnsite')::numeric as generated_onsite,
       (x.heat_data ->> 'onSiteEmissions')::numeric as onsite_emissions,
       (x.heat_data ->> 'purchasedEmissionFactor')::numeric as purchased_emission_factor,
       ('heat')::varchar(1000) as energy_type
       -- add heat address to address view
    from x
    )
    union
    (
    with x as (
      select
        form_result.application_id,
        form_result.version_number,
            (form_result)::json -> 'electricity' as electricity_data
      from ggircs_portal.form_result
      join ggircs_portal.form_json
      on form_result.form_id = form_json.id
      and form_json.slug = 'electricity-and-heat'
    )
    select
       x.application_id,
       x.version_number,
       (x.electricity_data ->> 'sold')::numeric as sold,
       (x.electricity_data ->> 'purchased')::numeric as purchased,
       (x.electricity_data ->> 'consumedOnsite')::numeric as consumed_onsite,
       (x.electricity_data ->> 'generatedOnsite')::numeric as generated_onsite,
       (x.electricity_data ->> 'onSiteEmissions')::numeric as onsite_emissions,
       (x.electricity_data ->> 'purchasedEmissionFactor')::numeric as purchased_emission_factor,
       ('electricity')::varchar(1000) as energy_type
       -- add heat address to address view
    from x
    )
 );

comment on view ggircs_portal.ciip_electricity_and_heat is E'@omit\n The view for electricity and heat data reported in the application';
comment on column ggircs_portal.ciip_electricity_and_heat.application_id is 'The application id ';
comment on column ggircs_portal.ciip_electricity_and_heat.version_number is 'The application revision number';
comment on column ggircs_portal.ciip_electricity_and_heat.energy_type is 'The energy type (electricity or heat)';
comment on column ggircs_portal.ciip_electricity_and_heat.sold is 'The amount of heat/electricity sold';
comment on column ggircs_portal.ciip_electricity_and_heat.purchased is 'The amount of heat/electricity purchased';
comment on column ggircs_portal.ciip_electricity_and_heat.consumed_onsite is 'The heat/electricity used on site';
comment on column ggircs_portal.ciip_electricity_and_heat.generated_onsite is 'The heat/electricity generated on site';
comment on column ggircs_portal.ciip_electricity_and_heat.onsite_emissions is 'The emissions (in tonnes of CO2e) from generated heat/electricity';
comment on column ggircs_portal.ciip_electricity_and_heat.purchased_emission_factor is 'The emission factor for the purchased heat/electricity';

commit;
