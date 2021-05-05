set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'fuel_is_carbon_taxed', array['ggircs_portal.fuel'],
  'Function ggircs_portal.fuel_is_carbon_taxed should exist'
);

-- test data
insert into swrs.fuel_carbon_tax_details(normalized_fuel_type, carbon_tax_act_fuel_type_id)
values ('Non carbon taxed test fuel - normalized', null),
       ('Carbon taxed test fuel - normalized', 1); -- Aviation fuel

insert into swrs.fuel_mapping(fuel_type, fuel_carbon_tax_details_id)
values ('Non carbon taxed test fuel', (select id from swrs.fuel_carbon_tax_details where normalized_fuel_type='Non carbon taxed test fuel - normalized')),
       ('Carbon taxed test fuel', (select id from swrs.fuel_carbon_tax_details where normalized_fuel_type='Carbon taxed test fuel - normalized'));

insert into ggircs_portal.fuel(name, swrs_fuel_mapping_id)
values ('Non carbon taxed test fuel', (select id from swrs.fuel_mapping where fuel_type='Non carbon taxed test fuel')),
       ('Carbon taxed test fuel', (select id from swrs.fuel_mapping where fuel_type='Carbon taxed test fuel'));

select is(
  (
    with tested_fuel as (
      select row(fuel.*)::ggircs_portal.fuel
      from ggircs_portal.fuel
      where name='Carbon taxed test fuel'
    )
    select ggircs_portal.fuel_is_carbon_taxed((select * from tested_fuel))
  ),
  true,
  'Function returns true if the fuel has a carbon tax act fuel type id'
);

select is(
  (
    with tested_fuel as (
      select row(fuel.*)::ggircs_portal.fuel
      from ggircs_portal.fuel
      where name='Non carbon taxed test fuel'
    )
    select ggircs_portal.fuel_is_carbon_taxed((select * from tested_fuel))
  ),
  false,
  'Function returns false if the fuel has a carbon tax act fuel type id'
);

select finish();

rollback;
