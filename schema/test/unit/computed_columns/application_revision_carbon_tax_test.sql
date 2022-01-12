begin;
set client_min_messages to warning;
create extension if not exists pgtap;

select plan(4);
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

select has_function(
  'ggircs_portal', 'application_revision_carbon_tax',
  'Function application_revision_carbon_tax should exist'
);

select set_eq(
  $$
    select fuel_id, carbon_tax, carbon_tax_eligible_for_ciip, reporting_year_fuel_charge, pre_increase_fuel_charge
    from ggircs_portal.application_revision_carbon_tax(
      (
        select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision
        where application_id = (select id from ggircs_portal.application where reporting_year = 2020 and facility_id = 1)
          and version_number = 1
      )
    )
  $$,
  $$
  values
    ((select id from ggircs_portal.fuel where name = 'Coke Oven Gas'), 1.323, 0, 0.0315, 0.0483),
    ((select id from ggircs_portal.fuel where name = 'Diesel'), 4296.6, 1075.2, 0.1023, 0.0767)
  $$,
  'The application_revision_carbon_tax function calculates the correct carbon tax for the 2020 reporting period'
  -- Coke Oven Gas is in the CTA, at 3.15 cent/cubic meter in 2020, so 42 m^3 is 42 * 3.15 / 100 = $1.323"
  -- There is no baseline set for the 2020 year, so the fuel_charge reverts to the rate on March 31st 2018
  -- The Coke Oven Gas fuel charge was higher on March 31st, 2018, at 4.83, there should be no tax eligible for CIIP

  -- Diesel is under "Light Fuel Oil in the CTA, at 10.23 cent/L in 2020, so 42 kL is 42 * 1000 * 10.23 / 100 = $4296.6"
  -- There is no baseline set for the 2020 year, so the fuel_charge reverts to the rate on March 31st 2018
  -- Diesel was priced at 7.67 cent/L on March 31st, 2018, so the portion eligible for ciip is 4296.6 - (42 * 1000 * 7.67 / 100) = 1075.2
);

select set_eq(
  $$
    select fuel_id, carbon_tax, carbon_tax_eligible_for_ciip, reporting_year_fuel_charge, pre_increase_fuel_charge
    from ggircs_portal.application_revision_carbon_tax(
      (
        select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision
        where application_id = (select id from ggircs_portal.application where reporting_year = 2021 and facility_id = 1)
          and version_number = 1
      )
    )
  $$,
  $$values
    ((select id from ggircs_portal.fuel where name = 'Coke Oven Gas'), 1.47, 0.5880, 0.0350, 0.021),
    ((select id from ggircs_portal.fuel where name = 'Diesel'), 4918.2, 1638, 0.1171, 0.0781)
  $$,
  'The application_revision_carbon_tax function calculates the correct carbon tax for the 2021 reporting period'
  -- Coke Oven Gas is in the CTA, at 3.50 cent/cubic meter in 2021, so 42 m^3 is 42 * 3.50 / 100 = $1.47"
  -- There is a baseline set for the 2021 year, so the fuel_charge is retrieved from the incremental_fuel_charge_baseline table
  -- The Coke Oven Gas baseline fuel charge is set at 0.021 for 2021, so the portion eligible for ciip is 1.47 - (42 * 1 * 2.10 / 100) = 0.5580

  -- Diesel is under "Light Fuel Oil in the CTA, at 11.71 cent/L in 2021, so 42 kL is 42 * 1000 * 11.71 / 100 = $4918.2"
  -- There is a baseline set for the 2021 year, so the fuel_charge is retrieved from the incremental_fuel_charge_baseline table
  -- Diesel baseline fuel charge is set at 7.81 cent/L, so the portion eligible for ciip is 4918.2 - (42 * 1000 * 7.81 / 100) = 1638.00;
);


-- Set form results so that Coke Oven Gas is reported in carbon taxed emisison categories and Diesel is reported in non-taxed categories
update ggircs_portal.form_result
set form_result = json_build_array(
  jsonb_build_object(
    'fuelRowId', (select id from ggircs_portal.fuel where name = 'Coke Oven Gas'),
    'quantity', 42,
    'emissionCategoryRowId', 1
  ),
  jsonb_build_object(
    'fuelRowId', (select id from ggircs_portal.fuel where name = 'Coke Oven Gas'),
    'quantity', 42,
    'emissionCategoryRowId', 3
  ),
  jsonb_build_object(
    'fuelRowId', (select id from ggircs_portal.fuel where name = 'Coke Oven Gas'),
    'quantity', 42,
    'emissionCategoryRowId', 4
  ),
  jsonb_build_object(
    'fuelRowId', (select id from ggircs_portal.fuel where name = 'Coke Oven Gas'),
    'quantity', 42,
    'emissionCategoryRowId', 6
  ),
  jsonb_build_object(
    'fuelRowId', (select id from ggircs_portal.fuel where name = 'Coke Oven Gas'),
    'quantity', 42,
    'emissionCategoryRowId', 7
  ),
  jsonb_build_object(
    'fuelRowId', (select id from ggircs_portal.fuel where name = 'Diesel'),
    'quantity', 42,
    'emissionCategoryRowId', 2
  ),
  jsonb_build_object(
    'fuelRowId', (select id from ggircs_portal.fuel where name = 'Diesel'),
    'quantity', 42,
    'emissionCategoryRowId', 5
  ),
  jsonb_build_object(
    'fuelRowId', (select id from ggircs_portal.fuel where name = 'Diesel'),
    'quantity', 42,
    'emissionCategoryRowId', 8
  ),
  jsonb_build_object(
    'fuelRowId', (select id from ggircs_portal.fuel where name = 'Diesel'),
    'quantity', 42,
    'emissionCategoryRowId', 9
  )
)
where version_number = 1
  and form_id = (select id from ggircs_portal.form_json where slug = 'fuel');

-- Only carbon-taxed emission categories are considered by the function
select set_eq(
  $$
    select fuel_id, carbon_tax, carbon_tax_eligible_for_ciip, reporting_year_fuel_charge, pre_increase_fuel_charge
    from ggircs_portal.application_revision_carbon_tax(
      (
        select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision
        where application_id = (select id from ggircs_portal.application where reporting_year = 2021 and facility_id = 1)
          and version_number = 1
      )
    )
  $$,
  $$values
    ((select id from ggircs_portal.fuel where name = 'Coke Oven Gas'), 1.47, 0.5880, 0.0350, 0.021),
    ((select id from ggircs_portal.fuel where name = 'Coke Oven Gas'), 1.47, 0.5880, 0.0350, 0.021),
    ((select id from ggircs_portal.fuel where name = 'Coke Oven Gas'), 1.47, 0.5880, 0.0350, 0.021),
    ((select id from ggircs_portal.fuel where name = 'Coke Oven Gas'), 1.47, 0.5880, 0.0350, 0.021),
    ((select id from ggircs_portal.fuel where name = 'Coke Oven Gas'), 1.47, 0.5880, 0.0350, 0.021)
  $$,
  'The application_revision_carbon_tax includes fuels reported under carbon-taxed emission categories and ignores non-taxed categories'
    -- carbon_taxed categories (id: 1 - General Stationary Combustion, 3 - Venting, 4 - Flaring, 6 - On-site Transportation)
    -- non carbon_taxed categories (id: 2 - Industrial Process, 5 - Fugitive, 7 - Waste, 8 - Wastewater, 9 - Other non-carbon taxed)
  );

select * from finish();
rollback;
