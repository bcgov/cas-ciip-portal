set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(11);

/** TEST SETUP **/
truncate ggircs_portal.application restart identity cascade;
truncate ggircs_portal.form_result restart identity cascade;
do $$
  declare disable_triggers json;
  begin
    disable_triggers := '
      {
        "application_revision_status": ["_status_change_email"],
        "ciip_user": ["_welcome_email"],
        "form_result": ["_immutable_form_result"]
      }
    ';
    perform test_helper.modify_triggers('disable', disable_triggers);
  end;
$$;
select test_helper.mock_open_window();
select test_helper.create_test_users();
select test_helper.create_applications(4, True, True);

-- Contains Sold Electricity
update ggircs_portal.form_result
set form_result = '[
  {
    "comments": "From accounting ",
    "isReadOnly": true,
    "isMandatory": true,
    "productName": "Purchased electricity",
    "productRowId": 3,
    "productState": "PUBLISHED",
    "productUnits": "unchanged",
    "isCiipProduct": false,
    "productAmount": 1000,
    "isEnergyProduct": true,
    "productEmissions": 906.26,
    "addEmissionsFromEios": false,
    "requiresProductAmount": true,
    "addPurchasedHeatEmissions": false,
    "requiresEmissionAllocation": true,
    "subtractExportedHeatEmissions": false,
    "subtractGeneratedHeatEmissions": false,
    "addPurchasedElectricityEmissions": false,
    "subtractExportedElectricityEmissions": false,
    "subtractGeneratedElectricityEmissions": false
  },
  {
    "comments": "From Emissions calculator = CO2e",
    "isReadOnly": true,
    "isMandatory": true,
    "productName": "Generated electricity",
    "productRowId": 5,
    "productState": "PUBLISHED",
    "productUnits": "unchanged",
    "isCiipProduct": false,
    "productAmount": 1000,
    "isEnergyProduct": true,
    "productEmissions": 31147.08,
    "addEmissionsFromEios": false,
    "requiresProductAmount": true,
    "addPurchasedHeatEmissions": false,
    "requiresEmissionAllocation": true,
    "subtractExportedHeatEmissions": false,
    "subtractGeneratedHeatEmissions": false,
    "addPurchasedElectricityEmissions": false,
    "subtractExportedElectricityEmissions": false,
    "subtractGeneratedElectricityEmissions": false
  },
  {
    "comments": "From Emissions Calculator = CO2e",
    "isReadOnly": true,
    "isMandatory": true,
    "productName": "Sold electricity",
    "productRowId": 1,
    "productState": "PUBLISHED",
    "productUnits": "MWh",
    "isCiipProduct": true,
    "productAmount": 134444,
    "isEnergyProduct": true,
    "productEmissions": 9315.97,
    "addEmissionsFromEios": false,
    "requiresProductAmount": true,
    "addPurchasedHeatEmissions": false,
    "requiresEmissionAllocation": true,
    "subtractExportedHeatEmissions": false,
    "subtractGeneratedHeatEmissions": false,
    "addPurchasedElectricityEmissions": false,
    "subtractExportedElectricityEmissions": false,
    "subtractGeneratedElectricityEmissions": false
  },
  {
    "comments": "From Emissions Calculator = CO2e",
    "isReadOnly": true,
    "isMandatory": true,
    "productName": "Generated heat",
    "productRowId": 6,
    "productState": "PUBLISHED",
    "productUnits": "unchanged",
    "isCiipProduct": false,
    "productAmount": 1000,
    "isEnergyProduct": true,
    "productEmissions": 31610.01,
    "addEmissionsFromEios": false,
    "requiresProductAmount": true,
    "addPurchasedHeatEmissions": false,
    "requiresEmissionAllocation": true,
    "subtractExportedHeatEmissions": false,
    "subtractGeneratedHeatEmissions": false,
    "addPurchasedElectricityEmissions": false,
    "subtractExportedElectricityEmissions": false,
    "subtractGeneratedElectricityEmissions": false
  },
  {
    "isReadOnly": true,
    "isMandatory": true,
    "productName": "Sold heat",
    "productRowId": 2,
    "productState": "PUBLISHED",
    "productUnits": "unchanged",
    "isCiipProduct": false,
    "productAmount": 1000,
    "isEnergyProduct": true,
    "productEmissions": 0,
    "addEmissionsFromEios": false,
    "requiresProductAmount": true,
    "addPurchasedHeatEmissions": false,
    "requiresEmissionAllocation": true,
    "subtractExportedHeatEmissions": false,
    "subtractGeneratedHeatEmissions": false,
    "addPurchasedElectricityEmissions": false,
    "subtractExportedElectricityEmissions": false,
    "subtractGeneratedElectricityEmissions": false
  },
  {
    "comments": "Pulp and Paper: Chemical pulp = SWRS attributable Emissions - CO2 from Schedule C biomass - Emissions from Sold Electricity - Emissions from Sold Heat\n\n = 1,242,048.71 - 1,122,381.20 - 9,315.97 – 0 = 110,351.54 tCO2e",
    "isReadOnly": false,
    "isMandatory": true,
    "productName": "Pulp and Paper: Chemical pulp",
    "productRowId": 97,
    "productState": "PUBLISHED",
    "productUnits": "unchanged",
    "isCiipProduct": true,
    "productAmount": 1000,
    "isEnergyProduct": false,
    "productEmissions": 110351.5487,
    "addEmissionsFromEios": false,
    "requiresProductAmount": true,
    "addPurchasedHeatEmissions": false,
    "requiresEmissionAllocation": true,
    "subtractExportedHeatEmissions": true,
    "subtractGeneratedHeatEmissions": false,
    "addPurchasedElectricityEmissions": false,
    "subtractExportedElectricityEmissions": true,
    "subtractGeneratedElectricityEmissions": false
  }
]'
where application_id=1 and form_id=4;

-- Does not contain Sold Electricity
update ggircs_portal.form_result
set form_result = '[
  {
    "comments": "From accounting ",
    "isReadOnly": true,
    "isMandatory": true,
    "productName": "Purchased electricity",
    "productRowId": 3,
    "productState": "PUBLISHED",
    "productUnits": "unchanged",
    "isCiipProduct": false,
    "productAmount": 1000,
    "isEnergyProduct": true,
    "productEmissions": 906.26,
    "addEmissionsFromEios": false,
    "requiresProductAmount": true,
    "addPurchasedHeatEmissions": false,
    "requiresEmissionAllocation": true,
    "subtractExportedHeatEmissions": false,
    "subtractGeneratedHeatEmissions": false,
    "addPurchasedElectricityEmissions": false,
    "subtractExportedElectricityEmissions": false,
    "subtractGeneratedElectricityEmissions": false
  },
  {
    "comments": "From Emissions calculator = CO2e",
    "isReadOnly": true,
    "isMandatory": true,
    "productName": "Generated electricity",
    "productRowId": 5,
    "productState": "PUBLISHED",
    "productUnits": "unchanged",
    "isCiipProduct": false,
    "productAmount": 1000,
    "isEnergyProduct": true,
    "productEmissions": 31147.08,
    "addEmissionsFromEios": false,
    "requiresProductAmount": true,
    "addPurchasedHeatEmissions": false,
    "requiresEmissionAllocation": true,
    "subtractExportedHeatEmissions": false,
    "subtractGeneratedHeatEmissions": false,
    "addPurchasedElectricityEmissions": false,
    "subtractExportedElectricityEmissions": false,
    "subtractGeneratedElectricityEmissions": false
  },
  {
    "comments": "From Emissions Calculator = CO2e",
    "isReadOnly": true,
    "isMandatory": true,
    "productName": "Generated heat",
    "productRowId": 6,
    "productState": "PUBLISHED",
    "productUnits": "unchanged",
    "isCiipProduct": false,
    "productAmount": 1000,
    "isEnergyProduct": true,
    "productEmissions": 31610.01,
    "addEmissionsFromEios": false,
    "requiresProductAmount": true,
    "addPurchasedHeatEmissions": false,
    "requiresEmissionAllocation": true,
    "subtractExportedHeatEmissions": false,
    "subtractGeneratedHeatEmissions": false,
    "addPurchasedElectricityEmissions": false,
    "subtractExportedElectricityEmissions": false,
    "subtractGeneratedElectricityEmissions": false
  },
  {
    "isReadOnly": true,
    "isMandatory": true,
    "productName": "Sold heat",
    "productRowId": 2,
    "productState": "PUBLISHED",
    "productUnits": "unchanged",
    "isCiipProduct": false,
    "productAmount": 1000,
    "isEnergyProduct": true,
    "productEmissions": 0,
    "addEmissionsFromEios": false,
    "requiresProductAmount": true,
    "addPurchasedHeatEmissions": false,
    "requiresEmissionAllocation": true,
    "subtractExportedHeatEmissions": false,
    "subtractGeneratedHeatEmissions": false,
    "addPurchasedElectricityEmissions": false,
    "subtractExportedElectricityEmissions": false,
    "subtractGeneratedElectricityEmissions": false
  },
  {
    "comments": "Pulp and Paper: Chemical pulp = SWRS attributable Emissions - CO2 from Schedule C biomass - Emissions from Sold Electricity - Emissions from Sold Heat\n\n = 1,242,048.71 - 1,122,381.20 - 9,315.97 – 0 = 110,351.54 tCO2e",
    "isReadOnly": false,
    "isMandatory": true,
    "productName": "Pulp and Paper: Chemical pulp",
    "productRowId": 97,
    "productState": "PUBLISHED",
    "productUnits": "unchanged",
    "isCiipProduct": true,
    "productAmount": 1000,
    "isEnergyProduct": false,
    "productEmissions": 110351.5487,
    "addEmissionsFromEios": false,
    "requiresProductAmount": true,
    "addPurchasedHeatEmissions": false,
    "requiresEmissionAllocation": true,
    "subtractExportedHeatEmissions": true,
    "subtractGeneratedHeatEmissions": false,
    "addPurchasedElectricityEmissions": false,
    "subtractExportedElectricityEmissions": true,
    "subtractGeneratedElectricityEmissions": false
  }
]'
where application_id=2 and form_id=4;

-- Contains Sold Electricity, productAmount=0
update ggircs_portal.form_result
set form_result = '[
  {
    "comments": "From Emissions Calculator = CO2e",
    "isReadOnly": true,
    "isMandatory": true,
    "productName": "Sold electricity",
    "productRowId": 1,
    "productState": "PUBLISHED",
    "productUnits": "MWh",
    "isCiipProduct": true,
    "productAmount": 0,
    "isEnergyProduct": true,
    "productEmissions": 9315.97,
    "addEmissionsFromEios": false,
    "requiresProductAmount": true,
    "addPurchasedHeatEmissions": false,
    "requiresEmissionAllocation": true,
    "subtractExportedHeatEmissions": false,
    "subtractGeneratedHeatEmissions": false,
    "addPurchasedElectricityEmissions": false,
    "subtractExportedElectricityEmissions": false,
    "subtractGeneratedElectricityEmissions": false
  }
]'
where application_id=3 and form_id=4;

update ggircs_portal.form_result set form_result = '{"changed": false}' where form_id != 4;

-- Call the function that changes the productUnits to GWh and scales the productAmount by a factor of 1000
select ggircs_portal_private.change_sold_electricity_units_to_gwh();

/** END SETUP **/

select has_function(
  'ggircs_portal_private', 'change_sold_electricity_units_to_gwh',
  'Function change_sold_electricity_units_to_gwh should exist'
);

select is (
  (select units from ggircs_portal.product where id=1),
  'GWh'::varchar,
  'Sold Electricity product units should be GWh'
);

select is (
  (select form_result from ggircs_portal.form_result where application_id=4 and version_number=1 and form_id=4),
  '[]'::jsonb,
  'The migration does not affect empty form_results'
);

select is (
  (select product_amount from ggircs_portal.ciip_production where application_id=3 and version_number=1 and product_id=1),
  0::numeric,
  'The migration leaves the product_amount unchanged for Sold Electricity when the amount is 0'
);

select is (
  (select product_units from ggircs_portal.ciip_production where application_id=1 and version_number=1 and product_id=1),
  'GWh'::varchar,
  'The migration changes the productUnits to GWh for the Sold Electricity Product'
);

select is (
  (select product_amount from ggircs_portal.ciip_production where application_id=1 and version_number=1 and product_id=1),
  134.444::numeric,
  'The migration scales the productAmount by 1000 for the Sold Electricity Product'
);

select is (
  (select distinct product_units from ggircs_portal.ciip_production where application_id=1 and version_number=1 and product_id != 1),
  'unchanged'::varchar,
  'The migration does not change the units of any other product in the form_result that contains Sold Electricity'
);

select is (
  (select distinct product_amount from ggircs_portal.ciip_production where application_id=1 and version_number=1 and product_id != 1),
  1000::numeric,
  'The migration does not change the amount of any other product in the form_result that contains Sold Electricity'
);

select is (
  (select distinct product_units from ggircs_portal.ciip_production where application_id=2 and version_number=1),
  'unchanged'::varchar,
  'The migration does not change the units of any products in a form_result that does not contain Sold Electricity'
);

select is (
  (select distinct product_amount from ggircs_portal.ciip_production where application_id=2 and version_number=1),
  1000::numeric,
  'The migration does not change the amount of any products in a form_result that does not contain Sold Electricity'
);

select is (
  (select distinct form_result from ggircs_portal.form_result where form_id != 4),
  '{"changed": false}'::jsonb,
  'The migration does not change any non-production form_result records'
);

select finish();
rollback;
