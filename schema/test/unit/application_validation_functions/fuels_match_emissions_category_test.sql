set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'fuels_match_emissions_category', array['ggircs_portal.application_revision'],
  'Function fuels_match_emissions_category should exist'
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
select test_helper.create_applications(1, True, True);

select is(
  (with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id=1 and version_number=1)
    select ggircs_portal.fuels_match_emissions_category((select * from record))),
  true,
  'Function returns true all fuels are reported under an emissions category that contains the fuel'
);

update ggircs_portal.form_result
set form_result =
'[
    {
      "fuelRowId": 81,
      "quantity": 10,
      "fuelUnits": "t",
      "emissionCategoryRowId": 1
    },
    {
      "fuelRowId": 85,
      "quantity": 10,
      "fuelUnits": "t",
      "emissionCategoryRowId": 1
    }
  ]'
where form_id=3;

select is(
  (with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id=1 and version_number=1)
    select ggircs_portal.fuels_match_emissions_category((select * from record))),
  false,
  'Function returns false a fuel is reported under an emissions category that does not contain that fuel'
);

select finish();

rollback;
