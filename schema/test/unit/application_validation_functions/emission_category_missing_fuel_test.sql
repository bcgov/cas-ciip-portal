set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'emission_category_missing_fuel', array['ggircs_portal.application_revision'],
  'Function emission_category_missing_fuel should exist'
);

-- Init tests
truncate ggircs_portal.organisation restart identity cascade;
do $$
  declare disable_triggers json;
  begin
    disable_triggers := '
      {
        "application_revision_status": ["_status_change_email"],
        "ciip_user": ["_welcome_email"],
        "form_result": ["_100_timestamps"]
      }
    ';
    perform test_helper.modify_triggers('disable', disable_triggers);
  end;
$$;

select test_helper.mock_open_window();
select test_helper.create_test_users();
select test_helper.create_applications(2, True, True);

update ggircs_portal.form_result
set form_result =
'[
    {
      "fuelRowId": 13,
      "quantity": 10,
      "fuelUnits": "t",
      "emissionCategoryRowId": 1
    }
  ]'
where form_id=3;

update ggircs_portal.form_result
set form_result =
'
{
  "sourceTypes": [
    {
      "gases":
        [
          {"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 10, "annualEmission": 5, "gasDescription": "Carbon dioxide from non-biomass"}
        ],
      "sourceTypeName": "General Stationary Combustion"
    },
    {
      "gases":
        [
          {"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 10, "annualEmission": 5, "gasDescription": "Carbon dioxide from non-biomass"}
        ],
      "sourceTypeName": "Industrial Process"
    }
  ]
}'
where application_id=1 and version_number=1 and form_id=2;

update ggircs_portal.form_result
set form_result =
'
{
  "sourceTypes": [
    {
      "gases":
        [
          {"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 10, "annualEmission": 5, "gasDescription": "Carbon dioxide from non-biomass"}
        ],
      "sourceTypeName": "General Stationary Combustion"
    }
  ]
}'
where application_id=2 and version_number=1 and form_id=2;

select is(
  (with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id=1 and version_number=1)
    select ggircs_portal.emission_category_missing_fuel((select * from record))),
  false,
  'Function returns false when there are emission categories with an emission reported, but no corresponding fuel reported'
);

select is(
  (with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id=2 and version_number=1)
    select ggircs_portal.emission_category_missing_fuel((select * from record))),
  true,
  'Function returns true when all emission categories with an emission reported have a corresponding fuel reported'
);

select finish();

rollback;
