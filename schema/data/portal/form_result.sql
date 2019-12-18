 begin;

with rows as (
insert into ggircs_portal.form_result
(id, form_id, application_id, version_number, form_result)
overriding system value
values
  (1,1,1,1, '{"operator": {"name": "Test operator"}}'),
  (2,2,1,1, '{"sourceTypes": [{"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 96, "annualEmission": 96, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 14, "annualEmission": 14, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 68, "annualEmission": 68, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 1425, "annualEmission": 57, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 27118, "annualEmission": 91, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Stationary Fuel Combustion"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 70, "annualEmission": 70, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 56, "annualEmission": 56, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 8, "annualEmission": 8, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 1425, "annualEmission": 57, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 10728, "annualEmission": 36, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Venting"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 13, "annualEmission": 13, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 89, "annualEmission": 89, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 29, "annualEmission": 29, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 2400, "annualEmission": 96, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 23840, "annualEmission": 80, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Flaring"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 77, "annualEmission": 77, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 38, "annualEmission": 38, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 22, "annualEmission": 22, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 2250, "annualEmission": 90, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 11324, "annualEmission": 38, "gasDescription": "Nitrous oxide"}, {"gwp": 22800, "gasType": "SF6", "annualCO2e": 2006400, "annualEmission": 88, "gasDescription": "Sulfur Hexafluoride"}, {"gwp": 7390, "gasType": "CF4", "annualCO2e": 59120, "annualEmission": 8, "gasDescription": "Perfluoromethane"}, {"gwp": 12200, "gasType": "C2F6", "annualCO2e": 366000, "annualEmission": 30, "gasDescription": "Perfluoroethane"}], "sourceTypeName": "Fugitive/Other"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 100, "annualEmission": 100, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 65, "annualEmission": 65, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 78, "annualEmission": 78, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 925, "annualEmission": 37, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 25330, "annualEmission": 85, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "On-Site Transportation"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 2, "annualEmission": 2, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 90, "annualEmission": 90, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 5, "annualEmission": 5, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 8000, "annualEmission": "320", "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 98340, "annualEmission": "330", "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Waste"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 340, "annualEmission": "340", "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 350, "annualEmission": "350", "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 360, "annualEmission": "360", "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 9250, "annualEmission": "370", "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 113240, "annualEmission": "380", "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Wastewater"}]}'),
  (3,3,1,1, '[{"fuelType": "C/D Waste - Plastic", "quantity": 4, "fuelUnits": "t", "methodology": "wci 1.0"}, {"fuelType": "Butane", "quantity": 400, "fuelUnits": "kL", "methodology": "wci 1.0"}]'),
  (4,4,1,1, '{"heat": {"sold": 81, "quantity": 96, "purchased": 29, "consumedOnsite": 54, "generatedOnsite": 44}, "electricity": {"sold": 57, "quantity": 28, "purchased": 22, "consumedOnsite": 87, "generatedOnsite": 66}}'),
  (5,5,1,1, '[
    {
      "quantity": 8760000,
      "productRowId": 29,
      "productUnits": "MWh",
      "additionalData": {
        "equipment": [
          {
            "id": "Compressor 1",
            "powerRating": 800,
            "energySource": "Electric - Self-Generated",
            "runtimeHours": 8760,
            "loadingFactor": 100,
            "compressorType": "Centrifugal", "consumedEnergy": 7008000
          }, {
            "id": "Compressor 2",
            "powerRating": 200,
            "energySource": "Electric - Self-Generated",
            "runtimeHours": 8760,
            "loadingFactor": 100,
            "compressorType": "Centrifugal",
            "consumedEnergy": 1752000
          }
        ],
        "calculatedQuantity": 8760000
      },
      "paymentAllocationFactor": 59,
      "productionAllocationFactor": 59
    }, {
      "quantity": 12000,
      "productRowId": 26,
      "productUnits": "t",
      "additionalData": {
        "anodeReductionAllocationFactor": 1,
        "anodeProductionAllocationFactor": 20,
        "cokeCalcinationAllocationFactor": 20,
        "calculatedPaymentAllocationFactor": 41,
        "calculatedProductionAllocationFactor": 1
      },
      "paymentAllocationFactor": 41,
      "productionAllocationFactor": 1
    }
  ]')
on conflict(id) do update set
form_id=excluded.form_id,
application_id=excluded.application_id,
version_number=excluded.version_number,
form_result=excluded.form_result
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.form_result' from rows;

select setval from
setval('ggircs_portal.form_result_id_seq', (select max(id) from ggircs_portal.form_result), true)
where setval = 0;

-- TODO: create_application_mutation_chain should automatically create a reporting year

commit;
