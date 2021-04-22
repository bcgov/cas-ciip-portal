set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(2);

select has_function(
  'ggircs_portal', 'application_revision_total_ciip_emissions',
  'Function application_revision_total_ciip_emissions should exist'
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
'{"sourceTypes": [{"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 10, "annualEmission": 5, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2bionC", "annualCO2e": 20, "annualEmission": 10, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "CO2bioC", "annualCO2e": 30, "annualEmission": 15, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 40, "annualEmission": 20, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N2O", "annualCO2e": 50, "annualEmission": 25, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "General Stationary Combustion"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 60, "annualEmission": 30, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2bionC", "annualCO2e": 70, "annualEmission": 35, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "CO2bioC", "annualCO2e": 80, "annualEmission": 40, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 90, "annualEmission": 45, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N2O", "annualCO2e": 100, "annualEmission": 50, "gasDescription": "Nitrous oxide"}, {"gwp": 22800, "gasType": "SF6", "annualCO2e": 110, "annualEmission": 55, "gasDescription": "Sulfur Hexafluoride"}, {"gwp": 7390, "gasType": "CF4", "annualCO2e": 120, "annualEmission": 60, "gasDescription": "Perfluoromethane"}, {"gwp": 12200, "gasType": "C2F6", "annualCO2e": 130, "annualEmission": 65, "gasDescription": "Perfluoroethane"}, {"gwp": 675, "gasType": "CH2F2", "annualCO2e": 140, "annualEmission": 70, "gasDescription": "Difluoromethane"}, {"gwp": 3500, "gasType": "C2HF5", "annualCO2e": 150, "annualEmission": 75, "gasDescription": "Pentafluoroethane"}, {"gwp": 1430, "gasType": "C2H2F4", "annualCO2e": 160, "annualEmission": 80, "gasDescription": "1,1,1,2-Tetrafluoroethane"}], "sourceTypeName": "Industrial Process"}]}'
where application_id=1;

select results_eq (
  $$
    with record as (select row(application_revision.*)::ggircs_portal.application_revision from ggircs_portal.application_revision where application_id = 1 and version_number = 1)
    select ggircs_portal.application_revision_total_ciip_emissions((select * from record))
  $$,
  $$
    select sum(annual_co2e)::numeric - (select sum(annual_co2e)::numeric from ggircs_portal.ciip_emission where version_number=1 and application_id=1 and gas_type ='CO2bioC')::numeric from ggircs_portal.ciip_emission
    where version_number = 1 and application_id = 1
  $$,
  'total_ciip_emissions function ignores emissions where is_ciip_emission = false when returning the sum of annual_co2e'
);

select finish();

rollback;
