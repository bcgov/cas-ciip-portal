set client_encoding = 'utf-8';
set client_min_messages = warning;
create extension if not exists pgtap;

begin;
select plan(2);

-- View should exist
select has_view(
    'ggircs_portal', 'ciip_carbon_tax_calculation',
    'ggircs_portal.ciip_carbon_tax_calculation should be a view'
);

truncate ggircs_portal.application restart identity cascade;
select test_helper.modify_triggers('disable');
reset client_min_messages;
select test_helper.mock_open_window(2019);
select ggircs_portal.create_application_mutation_chain(1);
select test_helper.mock_open_window(2020);
select ggircs_portal.create_application_mutation_chain(1);
select test_helper.mock_open_window(2021);
select ggircs_portal.create_application_mutation_chain(1);

-- update all three applications with the same amounts of fuels
update ggircs_portal.form_result
set form_result = json_build_array(
  jsonb_build_object(
    'fuelRowId', (select id from ggircs_portal.fuel where name = 'Coke Oven Gas'),
    'quantity', 42,
    'emissionCategoryRowId', 1
  ),
  jsonb_build_object(
    'fuelRowId', (select id from ggircs_portal.fuel where name = 'Diesel'),
    'quantity', 42,
    'emissionCategoryRowId', 1
  )
)
where version_number = 1
  and form_id = (select id from ggircs_portal.form_json where slug = 'fuel');


-- Carbon tax calculator calculates correct tax for Butane
select set_eq(
  $$
    select
      application_id, version_number, reporting_year, emission_category,
      fuel_id, fuel_type, fuel_amount, fuel_units,
      carbon_tax, carbon_tax_eligible_for_ciip, reporting_year_fuel_charge, pre_increase_fuel_charge
    from ggircs_portal.ciip_carbon_tax_calculation;
  $$,
  $$
  values
    (
      1, 1, 2019, 'General Stationary Combustion',
      (select id from ggircs_portal.fuel where name = 'Coke Oven Gas'), 'Coke Oven Gas', 42, 'm3',
      2.7048, 0.6762, 0.0644, 0.0483
    ),
        (
      1, 1, 2019, 'General Stationary Combustion',
      (select id from ggircs_portal.fuel where name = 'Diesel'), 'Diesel', 42, 'kL',
      4296.6, 1075.2, 0.1023, 0.0767
    ),
        (
      2, 1, 2020, 'General Stationary Combustion',
      (select id from ggircs_portal.fuel where name = 'Coke Oven Gas'), 'Coke Oven Gas', 42, 'm3',
      1.323, 0, 0.0315, 0.0483
    ),
        (
      2, 1, 2020, 'General Stationary Combustion',
      (select id from ggircs_portal.fuel where name = 'Diesel'), 'Diesel', 42, 'kL',
      4296.6, 1075.2, 0.1023, 0.0767
    ),
        (
      3, 1, 2021, 'General Stationary Combustion',
      (select id from ggircs_portal.fuel where name = 'Coke Oven Gas'), 'Coke Oven Gas', 42, 'm3',
      1.47, 0.5880, 0.0350, 0.021
    ),
        (
      3, 1, 2021, 'General Stationary Combustion',
      (select id from ggircs_portal.fuel where name = 'Diesel'), 'Diesel', 42, 'kL',
      4918.2, 1639.68, 0.1171, 0.07806
    )
  $$,
  'ciip_carbon_tax_calculation view returns the expected results'
); -- see schema/test/unit/computed_columns/application_revision_carbon_tax_test.sql for CT calculation details


select finish();

rollback;
