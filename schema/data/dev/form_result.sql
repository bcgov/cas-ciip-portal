/**
  Adds some dummy data into the form_result tables for Application id=1 version_number=1
  This allows us to have an Application populated with data already in progress.
  Also changes some of the form_results and populates them for Application id=2 version_number=2 for diffing.
*/

begin;

  create temp table dummy_results
  (
    id int generated always as identity,
    dummy_result jsonb
  )
  on commit drop;

  insert into dummy_results(dummy_result)
  values
  ('{"operator": {"name": "Test operator"}}'),
  ('{"sourceTypes": [{"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 96, "annualEmission": 96, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 14, "annualEmission": 14, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 68, "annualEmission": 68, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 1425, "annualEmission": 57, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 27118, "annualEmission": 91, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Stationary Fuel Combustion"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 70, "annualEmission": 70, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 56, "annualEmission": 56, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 8, "annualEmission": 8, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 1425, "annualEmission": 57, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 10728, "annualEmission": 36, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Venting"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 13, "annualEmission": 13, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 89, "annualEmission": 89, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 29, "annualEmission": 29, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 2400, "annualEmission": 96, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 23840, "annualEmission": 80, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Flaring"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 77, "annualEmission": 77, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 38, "annualEmission": 38, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 22, "annualEmission": 22, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 2250, "annualEmission": 90, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 11324, "annualEmission": 38, "gasDescription": "Nitrous oxide"}, {"gwp": 22800, "gasType": "SF6", "annualCO2e": 2006400, "annualEmission": 88, "gasDescription": "Sulfur Hexafluoride"}, {"gwp": 7390, "gasType": "CF4", "annualCO2e": 59120, "annualEmission": 8, "gasDescription": "Perfluoromethane"}, {"gwp": 12200, "gasType": "C2F6", "annualCO2e": 366000, "annualEmission": 30, "gasDescription": "Perfluoroethane"}], "sourceTypeName": "Fugitive/Other"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 100, "annualEmission": 100, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 65, "annualEmission": 65, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 78, "annualEmission": 78, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 925, "annualEmission": 37, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 25330, "annualEmission": 85, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "On-Site Transportation"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 2, "annualEmission": 2, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 90, "annualEmission": 90, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 5, "annualEmission": 5, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 8000, "annualEmission": "320", "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 98340, "annualEmission": "330", "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Waste"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 340, "annualEmission": "340", "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 350, "annualEmission": "350", "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 360, "annualEmission": "360", "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 9250, "annualEmission": "370", "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 113240, "annualEmission": "380", "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Wastewater"}]}'),
  ('[{"fuelRowId": 13, "quantity": 4, "fuelUnits": "t"}, {"fuelRowId": 11, "quantity": 400, "fuelUnits": "kL"}]'),
  ('[
    {
      "productAmount": 8760000,
      "productRowId": 29,
      "productUnits": "MWh",
      "productEmissions": 5900,
      "requiresEmissionAllocation": true,
      "requiresProductAmount": true,
      "isCiipProduct": true
    },
    {
      "productAmount": 12000,
      "productRowId": 26,
      "productUnits": "t",
      "productEmissions": 1300,
      "requiresEmissionAllocation": true,
      "requiresProductAmount": true,
      "isCiipProduct": true
    }
  ]'),
  ('{"operator": {"name": "Changed"}}'),
  ('{"sourceTypes": [{"gases": [{"gwp": 2, "gasType": "CO2nonbio", "annualCO2e": 5, "annualEmission": 6, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 141, "annualEmission": 142, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 68, "annualEmission": 68, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 1425, "annualEmission": 57, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 27118, "annualEmission": 91, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Stationary Fuel Combustion"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 70, "annualEmission": 70, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 56, "annualEmission": 56, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 8, "annualEmission": 8, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 1425, "annualEmission": 57, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 10728, "annualEmission": 36, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Venting"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 13, "annualEmission": 13, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 89, "annualEmission": 89, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 29, "annualEmission": 29, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 2400, "annualEmission": 96, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 23840, "annualEmission": 80, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Flaring"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 77, "annualEmission": 77, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 38, "annualEmission": 38, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 22, "annualEmission": 22, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 2250, "annualEmission": 90, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 11324, "annualEmission": 38, "gasDescription": "Nitrous oxide"}, {"gwp": 22800, "gasType": "SF6", "annualCO2e": 2006400, "annualEmission": 88, "gasDescription": "Sulfur Hexafluoride"}, {"gwp": 7390, "gasType": "CF4", "annualCO2e": 59120, "annualEmission": 8, "gasDescription": "Perfluoromethane"}, {"gwp": 12200, "gasType": "C2F6", "annualCO2e": 366000, "annualEmission": 30, "gasDescription": "Perfluoroethane"}], "sourceTypeName": "Fugitive/Other"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 100, "annualEmission": 100, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 65, "annualEmission": 65, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 78, "annualEmission": 78, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 925, "annualEmission": 37, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 25330, "annualEmission": 85, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "On-Site Transportation"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 2, "annualEmission": 2, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 90, "annualEmission": 90, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 5, "annualEmission": 5, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 8000, "annualEmission": "320", "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 98340, "annualEmission": "330", "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Waste"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 340, "annualEmission": "340", "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 350, "annualEmission": "350", "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 360, "annualEmission": "360", "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 9250, "annualEmission": "370", "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 113240, "annualEmission": "380", "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Wastewater"}]}'),
  ('[{"fuelRowId": 13, "quantity": 10, "fuelUnits": "t"}, {"fuelRowId": 11, "quantity": 40120, "fuelUnits": "kL"}]'),
  ('[
    {
      "productAmount": 8760000,
      "productRowId": 29,
      "productUnits": "MWh",
      "productEmissions": 5900,
      "requiresEmissionAllocation": true,
      "requiresProductAmount": true,
      "isCiipProduct": true
    },
    {
      "productAmount": 12000,
      "productRowId": 26,
      "productUnits": "t",
      "productEmissions": 1300,
      "requiresEmissionAllocation": true,
      "requiresProductAmount": true,
      "isCiipProduct": true
    }
  ]');

  select 'Updating form_results for application id=1: ';
  do $$
  declare
    temp_row record;
  begin
    for temp_row in
      select row_number() over () as index, form_id from ggircs_portal.ciip_application_wizard
    loop
      update ggircs_portal.form_result
        set form_result = (select dummy_result from dummy_results where id = temp_row.index)
        where form_id = temp_row.form_id
        and application_id = 1
        and version_number = 1;
      raise notice 'Form Result(version_number 1): % has been updated', (select name from ggircs_portal.form_json where id = temp_row.form_id);
      -- New set of form_results for diffing
      update ggircs_portal.form_result
        set form_result = (select dummy_result from dummy_results where id = (temp_row.index + (select count(form_id) from ggircs_portal.ciip_application_wizard)))
        where form_id = temp_row.form_id
        and application_id = 1
        and version_number = 2;
      raise notice 'Form Result(version_number 2): % has been updated', (select name from ggircs_portal.form_json where id = temp_row.form_id);
    end loop;
  end;
  $$;

commit;
