set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(8);

-- Clean schema
truncate ggircs_portal.application restart identity cascade;
alter table ggircs_portal.ciip_user disable trigger _welcome_email;
select test_helper.create_test_users();
select test_helper.mock_open_window();
-- Create facilities / applications
select test_helper.create_applications(3, True, True);

update ggircs_portal.application set reporting_year = 2022 where id != 3;
update ggircs_portal.application set reporting_year = 2021 where id = 3;
update ggircs_portal.application_revision set created_at = '2023-01-01'::timestamptz where application_id=1; -- created before April 1st 2023 so should be unaffected
update ggircs_portal.application_revision set created_at = '2023-05-01'::timestamptz where application_id=2; -- created after April 1st 2023 and has wrong annual CO2e values
update ggircs_portal.application_revision set created_at = '2023-06-01'::timestamptz where application_id=3; -- reporting year 2021 so should be unaffected

-- setting all form results to the same value intentionally to remove default values
update ggircs_portal.form_result set form_result='{"test": "dont change me"}'::jsonb;

-- Wrong annual CO2e values for application ID=2 and form ID=2
update ggircs_portal.form_result
set form_result =
'{"sourceTypes": [
  {"gases": [
    {"gwp": 10, "gasType": "CO2nonbio", "annualCO2e": 50, "annualEmission": 5, "gasDescription": "Carbon dioxide from non-biomass"}, 
    {"gwp": 28, "gasType": "CH4", "annualCO2e": 40, "annualEmission": 20, "gasDescription": "Methane"}],
  "sourceTypeName": "General Stationary Combustion"
  }, 
  {"gases": [
    {"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 60, "annualEmission": 30, "gasDescription": "Carbon dioxide from non-biomass"}, 
    {"gwp": 25, "gasType": "CH4", "annualCO2e": 90, "annualEmission": 45, "gasDescription": "Methane"}, 
    {"gwp": 298, "gasType": "N2O", "annualCO2e": 100, "annualEmission": 50, "gasDescription": "Nitrous oxide"}],
  "sourceTypeName": "General Stationary Combustion"
  }
]}'
where application_id=2 and form_id=2;

-- Running the function
alter table ggircs_portal.form_result disable trigger _100_timestamps, disable trigger _immutable_form_result;

select ggircs_portal_private.correct_annual_co2e_values();

alter table ggircs_portal.form_result enable trigger _100_timestamps, enable trigger _immutable_form_result;

-- Test 1
select results_eq(
  $$
  select form_result from ggircs_portal.form_result where application_id=1;
  $$,
  $$
  values 
  ('{"test": "dont change me"}'::jsonb), 
  ('{"test": "dont change me"}'::jsonb), 
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb)
  $$,
  'Application with ID 1 was unaffected because it was created before April 1st 2023'
);

-- Test 2
select set_eq (
  $$
  select form_result from ggircs_portal.form_result where application_id=2 and form_id=2;
  $$,
  $$
  values 
  ('{"sourceTypes": [
    {"gases": [
      {"gwp": 10, "gasType": "CO2nonbio", "annualCO2e": 50, "annualEmission": 5, "gasDescription": "Carbon dioxide from non-biomass"}, 
      {"gwp": 28, "gasType": "CH4", "annualCO2e": 560, "annualEmission": 20, "gasDescription": "Methane"}],
    "sourceTypeName": "General Stationary Combustion"
    }, 
    {"gases": [
      {"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 30, "annualEmission": 30, "gasDescription": "Carbon dioxide from non-biomass"}, 
      {"gwp": 25, "gasType": "CH4", "annualCO2e": 1125, "annualEmission": 45, "gasDescription": "Methane"}, 
      {"gwp": 298, "gasType": "N2O", "annualCO2e": 14900, "annualEmission": 50, "gasDescription": "Nitrous oxide"}],
    "sourceTypeName": "General Stationary Combustion"
    }
  ]}'::jsonb)
  $$,
  'Application with ID 2 and form ID 2 was updated because it was created after April 1st 2023'
);

-- Test 3
select results_eq(
  $$
  select form_result from ggircs_portal.form_result where application_id=2 and form_id!=2;
  $$,
  $$
  values 
  ('{"test": "dont change me"}'::jsonb), 
  ('{"test": "dont change me"}'::jsonb), 
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb)
  $$,
  'Application with ID 2 and form IDs except 2 were not changed'
);

-- Test 4
select results_eq(
  $$
  select form_result from ggircs_portal.form_result where application_id=3;
  $$,
  $$
  values 
  ('{"test": "dont change me"}'::jsonb), 
  ('{"test": "dont change me"}'::jsonb), 
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb)
  $$,
  'Application with ID 3 was unaffected because it is from the 2021 reporting year'
);

-- Below assertions are to make sure that the function is idempotent
alter table ggircs_portal.form_result disable trigger _100_timestamps, disable trigger _immutable_form_result;

select ggircs_portal_private.correct_annual_co2e_values();

alter table ggircs_portal.form_result enable trigger _100_timestamps, enable trigger _immutable_form_result;

-- Test 5
select results_eq(
  $$
  select form_result from ggircs_portal.form_result where application_id=1;
  $$,
  $$
  values 
  ('{"test": "dont change me"}'::jsonb), 
  ('{"test": "dont change me"}'::jsonb), 
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb)
  $$,
  'Application with ID 1 was unaffected because it was created before April 1st 2023'
);

-- Test 6
select set_eq (
  $$
  select form_result from ggircs_portal.form_result where application_id=2 and form_id=2;
  $$,
  $$
  values 
  ('{"sourceTypes": [
    {"gases": [
      {"gwp": 10, "gasType": "CO2nonbio", "annualCO2e": 50, "annualEmission": 5, "gasDescription": "Carbon dioxide from non-biomass"}, 
      {"gwp": 28, "gasType": "CH4", "annualCO2e": 560, "annualEmission": 20, "gasDescription": "Methane"}],
    "sourceTypeName": "General Stationary Combustion"
    }, 
    {"gases": [
      {"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 30, "annualEmission": 30, "gasDescription": "Carbon dioxide from non-biomass"}, 
      {"gwp": 25, "gasType": "CH4", "annualCO2e": 1125, "annualEmission": 45, "gasDescription": "Methane"}, 
      {"gwp": 298, "gasType": "N2O", "annualCO2e": 14900, "annualEmission": 50, "gasDescription": "Nitrous oxide"}],
    "sourceTypeName": "General Stationary Combustion"
    }
  ]}'::jsonb)
  $$,
  'Application with ID 2 and form ID 2 was updated because it was created after April 1st 2023'
);

-- Test 7
select results_eq(
  $$
  select form_result from ggircs_portal.form_result where application_id=2 and form_id!=2;
  $$,
  $$
  values 
  ('{"test": "dont change me"}'::jsonb), 
  ('{"test": "dont change me"}'::jsonb), 
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb)
  $$,
  'Application with ID 2 and form IDs except 2 were not changed'
);

-- Test 8
select results_eq(
  $$
  select form_result from ggircs_portal.form_result where application_id=3;
  $$,
  $$
  values 
  ('{"test": "dont change me"}'::jsonb), 
  ('{"test": "dont change me"}'::jsonb), 
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb),
  ('{"test": "dont change me"}'::jsonb)
  $$,
  'Application with ID 3 was unaffected because it is from the 2021 reporting year'
);

select finish();

rollback;
