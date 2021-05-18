set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(2);

select has_function(
  'ggircs_portal', 'application_revision_production_form_data',
  'Function application_revision_production_form_data should exist'
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
      "productAmount": 8760000,
      "productRowId": 29,
      "productUnits": "MWh",
      "productEmissions": 5900,
      "requiresEmissionAllocation": true,
      "requiresProductAmount": true,
      "isCiipProduct": true
    }
  ]'
where application_id=1;

update ggircs_portal.form_result
set form_result =
'[
    {
      "productAmount": 60000,
      "productRowId": 29,
      "productUnits": "MWh",
      "productEmissions": 5900,
      "requiresEmissionAllocation": true,
      "requiresProductAmount": true,
      "isCiipProduct": true
    }
  ]'
where application_id=2;

select results_eq(
  $$
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id = 1 and version_number = 1)
    select product_amount from ggircs_portal.application_revision_production_form_data((select * from record))
  $$,
  $$
    select product_amount from ggircs_portal.ciip_production where application_id=1 and version_number=1;
  $$,
  'application_revision_production_form_data retrieves the production data for a specific application revision'
);

select finish();

rollback;
