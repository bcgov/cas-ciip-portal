-- disable unnecessary triggers
-- add ciip_user_organisation connection if not set
-- refresh application data with truncate & create_application_mutation_chain
-- create 'submitted' applications for the analyst to view & diff
-- edit form results for versions 1&2 for diffing

begin;

alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.application_revision_status
  disable trigger _status_change_email;
alter table ggircs_portal.certification_url
  disable trigger _certification_request_email;
alter table ggircs_portal.certification_url
  disable trigger _signed_by_certifier_email;
alter table ggircs_portal.application_revision_status
  disable trigger _check_certification_signature_md5;
delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=7;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');
truncate ggircs_portal.application restart identity cascade;
select ggircs_portal.create_application_mutation_chain(1);
select ggircs_portal.create_application_mutation_chain(2);
select ggircs_portal.create_application_revision_mutation_chain(1,1);
update ggircs_portal.certification_url set certification_signature = 'signed' where application_id=1;
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (1,1,'submitted');
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (1,2,'submitted');
update ggircs_portal.form_result set form_result='{"operator": {"name": "Test operator"}}' where application_id=1 and version_number=1 and form_id=1;
update ggircs_portal.form_result set form_result='{"sourceTypes": [{"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 96, "annualEmission": 96, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 14, "annualEmission": 14, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 68, "annualEmission": 68, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 1425, "annualEmission": 57, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 27118, "annualEmission": 91, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Stationary Fuel Combustion"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 70, "annualEmission": 70, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 56, "annualEmission": 56, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 8, "annualEmission": 8, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 1425, "annualEmission": 57, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 10728, "annualEmission": 36, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Venting"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 13, "annualEmission": 13, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 89, "annualEmission": 89, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 29, "annualEmission": 29, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 2400, "annualEmission": 96, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 23840, "annualEmission": 80, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Flaring"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 77, "annualEmission": 77, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 38, "annualEmission": 38, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 22, "annualEmission": 22, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 2250, "annualEmission": 90, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 11324, "annualEmission": 38, "gasDescription": "Nitrous oxide"}, {"gwp": 22800, "gasType": "SF6", "annualCO2e": 2006400, "annualEmission": 88, "gasDescription": "Sulfur Hexafluoride"}, {"gwp": 7390, "gasType": "CF4", "annualCO2e": 59120, "annualEmission": 8, "gasDescription": "Perfluoromethane"}, {"gwp": 12200, "gasType": "C2F6", "annualCO2e": 366000, "annualEmission": 30, "gasDescription": "Perfluoroethane"}], "sourceTypeName": "Fugitive/Other"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 100, "annualEmission": 100, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 65, "annualEmission": 65, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 78, "annualEmission": 78, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 925, "annualEmission": 37, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 25330, "annualEmission": 85, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "On-Site Transportation"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 2, "annualEmission": 2, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 90, "annualEmission": 90, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 5, "annualEmission": 5, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 8000, "annualEmission": "320", "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 98340, "annualEmission": "330", "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Waste"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 340, "annualEmission": "340", "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 350, "annualEmission": "350", "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 360, "annualEmission": "360", "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 9250, "annualEmission": "370", "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 113240, "annualEmission": "380", "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Wastewater"}]}'
  where application_id=1 and version_number=1 and form_id=2;
update ggircs_portal.form_result set form_result='[{"fuelType": "C/D Waste - Plastic", "quantity": 4, "fuelUnits": "t", "methodology": "wci 1.0"}, {"fuelType": "Butane", "quantity": 400, "fuelUnits": "kL", "methodology": "wci 1.0"}]'
  where application_id=1 and version_number=1 and form_id=3;
update ggircs_portal.form_result set form_result='{"heat": {"sold": 81, "quantity": 96, "purchased": 29, "consumedOnsite": 54, "generatedOnsite": 44}, "electricity": {"sold": 57, "quantity": 28, "purchased": 22, "consumedOnsite": 87, "generatedOnsite": 66}}'
  where application_id=1 and version_number=1 and form_id=4;
update ggircs_portal.form_result set form_result='[
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
      "productionAllocationFactor": 59,
      "importedElectricityAllocationFactor": 20,
      "importedHeatAllocationFactor": 20
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
      "productionAllocationFactor": 1,
      "importedElectricityAllocationFactor": 20,
      "importedHeatAllocationFactor": 20
    }
  ]' where application_id=1 and version_number=1 and form_id=5;


update ggircs_portal.form_result set form_result='{"operator": {"name": "Changed"}}' where application_id=1 and version_number=2 and form_id=1;
update ggircs_portal.form_result set form_result='{"sourceTypes": [{"gases": [{"gwp": 2, "gasType": "CO2nonbio", "annualCO2e": 5, "annualEmission": 6, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 141, "annualEmission": 142, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 68, "annualEmission": 68, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 1425, "annualEmission": 57, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 27118, "annualEmission": 91, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Stationary Fuel Combustion"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 70, "annualEmission": 70, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 56, "annualEmission": 56, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 8, "annualEmission": 8, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 1425, "annualEmission": 57, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 10728, "annualEmission": 36, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Venting"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 13, "annualEmission": 13, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 89, "annualEmission": 89, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 29, "annualEmission": 29, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 2400, "annualEmission": 96, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 23840, "annualEmission": 80, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Flaring"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 77, "annualEmission": 77, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 38, "annualEmission": 38, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 22, "annualEmission": 22, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 2250, "annualEmission": 90, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 11324, "annualEmission": 38, "gasDescription": "Nitrous oxide"}, {"gwp": 22800, "gasType": "SF6", "annualCO2e": 2006400, "annualEmission": 88, "gasDescription": "Sulfur Hexafluoride"}, {"gwp": 7390, "gasType": "CF4", "annualCO2e": 59120, "annualEmission": 8, "gasDescription": "Perfluoromethane"}, {"gwp": 12200, "gasType": "C2F6", "annualCO2e": 366000, "annualEmission": 30, "gasDescription": "Perfluoroethane"}], "sourceTypeName": "Fugitive/Other"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 100, "annualEmission": 100, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 65, "annualEmission": 65, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 78, "annualEmission": 78, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 925, "annualEmission": 37, "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 25330, "annualEmission": 85, "gasDescription": "Nitrous oxide"}], "sourceTypeName": "On-Site Transportation"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 2, "annualEmission": 2, "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 90, "annualEmission": 90, "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 5, "annualEmission": 5, "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 8000, "annualEmission": "320", "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 98340, "annualEmission": "330", "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Waste"}, {"gases": [{"gwp": 1, "gasType": "CO2nonbio", "annualCO2e": 340, "annualEmission": "340", "gasDescription": "Carbon dioxide from non-biomass"}, {"gwp": 1, "gasType": "CO2", "annualCO2e": 350, "annualEmission": "350", "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"}, {"gwp": 1, "gasType": "bioCO2", "annualCO2e": 360, "annualEmission": "360", "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"}, {"gwp": 25, "gasType": "CH4", "annualCO2e": 9250, "annualEmission": "370", "gasDescription": "Methane"}, {"gwp": 298, "gasType": "N20", "annualCO2e": 113240, "annualEmission": "380", "gasDescription": "Nitrous oxide"}], "sourceTypeName": "Wastewater"}]}'
  where application_id=1 and version_number=2 and form_id=2;
update ggircs_portal.form_result set form_result='[{"fuelType": "C/D Waste - Plastic", "quantity": 10, "fuelUnits": "t", "methodology": "wci 2.0"}, {"fuelType": "Butane", "quantity": 40120, "fuelUnits": "kL", "methodology": "wci 1.0"}]'
  where application_id=1 and version_number=2 and form_id=3;
update ggircs_portal.form_result set form_result='{"heat": {"sold": 0, "quantity": 6, "purchased": 29, "consumedOnsite": 5, "generatedOnsite": 44}, "electricity": {"sold": 7, "quantity": 2, "purchased": 22, "consumedOnsite": 87, "generatedOnsite": 66}}'
  where application_id=1 and version_number=2 and form_id=4;
update ggircs_portal.form_result set form_result='[
    {
      "quantity": 87600,
      "productRowId": 29,
      "productUnits": "MWh",
      "additionalData": {
        "equipment": [
          {
            "id": "Compressor 1",
            "powerRating": 800,
            "energySource": "Electric - Self-Generated",
            "runtimeHours": 80,
            "loadingFactor": 100,
            "compressorType": "Centrifugal", "consumedEnergy": 7008000
          }, {
            "id": "Compressor 2",
            "powerRating": 200,
            "energySource": "Electric - Self-Generated",
            "runtimeHours": 860,
            "loadingFactor": 100,
            "compressorType": "Centrifugal",
            "consumedEnergy": 1752000
          }
        ],
        "calculatedQuantity": 8760
      },
      "paymentAllocationFactor": 5,
      "productionAllocationFactor": 5,
      "importedElectricityAllocationFactor": 20,
      "importedHeatAllocationFactor": 20
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
      "productionAllocationFactor": 1,
      "importedElectricityAllocationFactor": 20,
      "importedHeatAllocationFactor": 20
    }
  ]'
  where application_id=1 and version_number=2 and form_id=5;

commit;
