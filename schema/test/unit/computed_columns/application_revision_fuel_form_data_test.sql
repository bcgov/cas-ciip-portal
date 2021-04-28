set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(2);

select has_function(
  'ggircs_portal', 'application_revision_fuel_form_data',
  'Function application_revision_fuel_form_data should exist'
);

-- Init tests
truncate ggircs_portal.organisation restart identity cascade;
do $$
  declare disable_triggers json;
  begin
    disable_triggers := '
      {
        "application": ["_send_draft_application_email"],
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
select test_helper.create_applications(1, True, True);

update ggircs_portal.form_result
set form_result =
'[
    {
      "fuelRowId": 13,
      "quantity": 10,
      "fuelUnits": "t",
      "emissionCategoryRowId": 1
    },
    {
      "fuelRowId": 10,
      "quantity": 40120,
      "fuelUnits": "kL",
      "emissionCategoryRowId": 3
    },
    {
      "fuelRowId": 12,
      "quantity": 40,
      "fuelUnits": "kL",
      "emissionCategoryRowId": 2
    }
  ]'
where application_id=1;

select results_eq(
  $$
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id = 1 and version_number = 1)
    select quantity from ggircs_portal.application_revision_fuel_form_data((select * from record))
  $$,
  $$
    select quantity from ggircs_portal.ciip_fuel where application_id=1 and version_number=1;
  $$,
  'application_revision_fuel_form_data retrieves the fuel data for a specific application revision'
);

select finish();

rollback;
