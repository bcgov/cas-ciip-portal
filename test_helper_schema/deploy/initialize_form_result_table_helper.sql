-- Deploy test_helpers:initialize_form_result_table_helper to pg
-- requires: schema_test_helper


-- WARNING this function requires form_json to contain 4 forms with IDs {1,2,3,4} from the dev data
-- create_application_mutation_chain is basically required for this to work.
BEGIN;

create or replace function test_helper.initialize_form_result(application_id int, version_number int)
returns void as
$function$
  declare
  begin
    -- We make sure that the requested application_id exists
    if not exists ( select 1 from ggircs_portal.application where id=$1 )
    then
      raise exception 'There is no application with id % in the database', application_id;
    end if;

    -- We make sure that the requested version_number exists
    if not exists ( select 1 from ggircs_portal.application_revision as ar where ar.application_id=$1 and ar.version_number=$2 )
    then
      raise exception 'There is no application revision with application_id % and version_number % in the database', application_id, version_number;
    end if;

    -- We insert the data
    update ggircs_portal.form_result as fr set form_result = '{
      "facility": {
        "bcghgid": "123465",
        "facilityName": "test",
        "facilityType": "L_c"
      },
      "operator": {
        "name": "Changed",
        "naics": "12345",
        "tradeName": "trade",
        "bcCorporateRegistryNumber": "HK8394024",
        "mailingAddress": {
          "city": "Victoria",
          "province": "British Columbia",
          "streetAddress": "123 street st",
          "postalCode": "H0H 0H0"
        }
      }, "operationalRepresentative": {
        "firstName": "first",
        "lastName": "last",
        "email": "first@last.com",
        "phone": "2509991234",
        "position": "CEO",
        "mailingAddress": {
          "city": "Victoria",
          "province": "British Columbia",
          "streetAddress": "123 street st",
          "postalCode": "H0H 0H0"
        }
      }
      }
      ' where fr.application_id=$1 and fr.version_number=$2 and form_id=1;
    
    update ggircs_portal.form_result as fr set form_result = '{
        "sourceTypes": [{
          "gases": [{
            "gwp": 2,
            "gasType": "CO2nonbio",
            "annualCO2e": 5,
            "annualEmission": 6,
            "gasDescription": "Carbon dioxide from non-biomass"
          }, {
            "gwp": 1,
            "gasType": "CO2",
            "annualCO2e": 141,
            "annualEmission": 142,
            "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"
          }, {
            "gwp": 1,
            "gasType": "bioCO2",
            "annualCO2e": 68,
            "annualEmission": 68,
            "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"
          }, {
            "gwp": 25,
            "gasType": "CH4",
            "annualCO2e": 1425,
            "annualEmission": 57,
            "gasDescription": "Methane"
          }, {
            "gwp": 298,
            "gasType": "N20",
            "annualCO2e": 27118,
            "annualEmission": 91,
            "gasDescription": "Nitrous oxide"
          }],
          "sourceTypeName": "Stationary Fuel Combustion"
        }, {
          "gases": [{
            "gwp": 1,
            "gasType": "CO2nonbio",
            "annualCO2e": 70,
            "annualEmission": 70,
            "gasDescription": "Carbon dioxide from non-biomass"
          }, {
            "gwp": 1,
            "gasType": "CO2",
            "annualCO2e": 56,
            "annualEmission": 56,
            "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"
          }, {
            "gwp": 1,
            "gasType": "bioCO2",
            "annualCO2e": 8,
            "annualEmission": 8,
            "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"
          }, {
            "gwp": 25,
            "gasType": "CH4",
            "annualCO2e": 1425,
            "annualEmission": 57,
            "gasDescription": "Methane"
          }, {
            "gwp": 298,
            "gasType": "N20",
            "annualCO2e": 10728,
            "annualEmission": 36,
            "gasDescription": "Nitrous oxide"
          }],
          "sourceTypeName": "Venting"
        }, {
          "gases": [{
            "gwp": 1,
            "gasType": "CO2nonbio",
            "annualCO2e": 13,
            "annualEmission": 13,
            "gasDescription": "Carbon dioxide from non-biomass"
          }, {
            "gwp": 1,
            "gasType": "CO2",
            "annualCO2e": 89,
            "annualEmission": 89,
            "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"
          }, {
            "gwp": 1,
            "gasType": "bioCO2",
            "annualCO2e": 29,
            "annualEmission": 29,
            "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"
          }, {
            "gwp": 25,
            "gasType": "CH4",
            "annualCO2e": 2400,
            "annualEmission": 96,
            "gasDescription": "Methane"
          }, {
            "gwp": 298,
            "gasType": "N20",
            "annualCO2e": 23840,
            "annualEmission": 80,
            "gasDescription": "Nitrous oxide"
          }],
          "sourceTypeName": "Flaring"
        }, {
          "gases": [{
            "gwp": 1,
            "gasType": "CO2nonbio",
            "annualCO2e": 77,
            "annualEmission": 77,
            "gasDescription": "Carbon dioxide from non-biomass"
          }, {
            "gwp": 1,
            "gasType": "CO2",
            "annualCO2e": 38,
            "annualEmission": 38,
            "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"
          }, {
            "gwp": 1,
            "gasType": "bioCO2",
            "annualCO2e": 22,
            "annualEmission": 22,
            "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"
          }, {
            "gwp": 25,
            "gasType": "CH4",
            "annualCO2e": 2250,
            "annualEmission": 90,
            "gasDescription": "Methane"
          }, {
            "gwp": 298,
            "gasType": "N20",
            "annualCO2e": 11324,
            "annualEmission": 38,
            "gasDescription": "Nitrous oxide"
          }, {
            "gwp": 22800,
            "gasType": "SF6",
            "annualCO2e": 2006400,
            "annualEmission": 88,
            "gasDescription": "Sulfur Hexafluoride"
          }, {
            "gwp": 7390,
            "gasType": "CF4",
            "annualCO2e": 59120,
            "annualEmission": 8,
            "gasDescription": "Perfluoromethane"
          }, {
            "gwp": 12200,
            "gasType": "C2F6",
            "annualCO2e": 366000,
            "annualEmission": 30,
            "gasDescription": "Perfluoroethane"
          }],
          "sourceTypeName": "Fugitive/Other"
        }, {
          "gases": [{
            "gwp": 1,
            "gasType": "CO2nonbio",
            "annualCO2e": 100,
            "annualEmission": 100,
            "gasDescription": "Carbon dioxide from non-biomass"
          }, {
            "gwp": 1,
            "gasType": "CO2",
            "annualCO2e": 65,
            "annualEmission": 65,
            "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"
          }, {
            "gwp": 1,
            "gasType": "bioCO2",
            "annualCO2e": 78,
            "annualEmission": 78,
            "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"
          }, {
            "gwp": 25,
            "gasType": "CH4",
            "annualCO2e": 925,
            "annualEmission": 37,
            "gasDescription": "Methane"
          }, {
            "gwp": 298,
            "gasType": "N20",
            "annualCO2e": 25330,
            "annualEmission": 85,
            "gasDescription": "Nitrous oxide"
          }],
          "sourceTypeName": "On-Site Transportation"
        }, {
          "gases": [{
            "gwp": 1,
            "gasType": "CO2nonbio",
            "annualCO2e": 2,
            "annualEmission": 2,
            "gasDescription": "Carbon dioxide from non-biomass"
          }, {
            "gwp": 1,
            "gasType": "CO2",
            "annualCO2e": 90,
            "annualEmission": 90,
            "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"
          }, {
            "gwp": 1,
            "gasType": "bioCO2",
            "annualCO2e": 5,
            "annualEmission": 5,
            "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"
          }, {
            "gwp": 25,
            "gasType": "CH4",
            "annualCO2e": 8000,
            "annualEmission": 320,
            "gasDescription": "Methane"
          }, {
            "gwp": 298,
            "gasType": "N20",
            "annualCO2e": 98340,
            "annualEmission": 330,
            "gasDescription": "Nitrous oxide"
          }],
          "sourceTypeName": "Waste"
        }, {
          "gases": [{
            "gwp": 1,
            "gasType": "CO2nonbio",
            "annualCO2e": 340,
            "annualEmission": 340,
            "gasDescription": "Carbon dioxide from non-biomass"
          }, {
            "gwp": 1,
            "gasType": "CO2",
            "annualCO2e": 350,
            "annualEmission": 350,
            "gasDescription": "Carbon dioxide from biomass not listed in Schedule C of GGERR"
          }, {
            "gwp": 1,
            "gasType": "bioCO2",
            "annualCO2e": 360,
            "annualEmission": 360,
            "gasDescription": "Carbon dioxide from biomass listed in Schedule C of GGERR"
          }, {
            "gwp": 25,
            "gasType": "CH4",
            "annualCO2e": 9250,
            "annualEmission": 370,
            "gasDescription": "Methane"
          }, {
            "gwp": 298,
            "gasType": "N20",
            "annualCO2e": 113240,
            "annualEmission": 380,
            "gasDescription": "Nitrous oxide"
          }],
          "sourceTypeName": "Wastewater"
        }]
        }
        ' where fr.application_id=$1 and fr.version_number=$2 and form_id=2;

      update ggircs_portal.form_result fr set form_result = '[
        {
          "fuelRowId": 11,
          "quantity": 10,
          "fuelUnits": "t",
          "emissionCategoryRowId": 1
        }, {
          "fuelRowId": 13,
          "quantity": 40120,
          "fuelUnits": "kL",
          "emissionCategoryRowId": 1
        }]
        ' where fr.application_id=$1 and fr.version_number=$2 and form_id=3;
              
      update ggircs_portal.form_result as fr set form_result = '[
          {
            "productAmount": 87600,
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
            "productEmissions": 5,
            "importedElectricityAllocationFactor": 20,
            "importedHeatAllocationFactor": 20
          }, {
            "productAmount": 12000,
            "productRowId": 26,
            "productUnits": "t",
            "additionalData": {
              "anodeReductionAllocationFactor": 1,
              "anodeproductEmissions": 20,
              "cokeCalcinationAllocationFactor": 20,
              "calculatedPaymentAllocationFactor": 41,
              "calculatedproductEmissions": 1
            },
            "paymentAllocationFactor": 41,
            "productEmissions": 1,
            "importedElectricityAllocationFactor": 20,
            "importedHeatAllocationFactor": 20
          }
        ]' where fr.application_id=$1 and fr.version_number=$2 and form_id=4;

  end;
$function$ language plpgsql volatile;



COMMIT;
