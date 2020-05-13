-- disable unnecessary triggers
-- add ciip_user_organisation connection if not set
-- refresh application data with truncate & create_application_mutation_chain
-- set legal-disclaimer to false to trigger legal checkbox pages
-- update form_result data so that there are no errors & reporter can move through all pages

begin;

alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.application_revision_status
  disable trigger _status_change_email;
alter table ggircs_portal.certification_url
  disable trigger _certification_request_email;
alter table ggircs_portal.certification_url
  disable trigger _signed_by_certifier_email;
alter table ggircs_portal.certification_url
  disable trigger _random_id;

truncate ggircs_portal.certification_url restart identity cascade;
truncate ggircs_portal.application restart identity cascade;
select ggircs_portal.create_application_mutation_chain(1);

-- Ensure products referenced in form_result are in the database
delete from ggircs_portal.benchmark;
delete from ggircs_portal.product;

insert into ggircs_portal.product(id, product_name, units, product_state, requires_emission_allocation, requires_product_amount)
overriding system value
values
(26, 'Coal','tonnes','published', true, true),
(29, 'Other Pulp (Mechanical pulp, paper, newsprint)', 'bone-dry tonnes','published', true, true);

-- Ensure all form results contain no errors
update ggircs_portal.form_result set form_result = '{
"facility": {
  "naics": "12345",
  "bcghgid": "123465",
  "facilityName": "test",
  "facilityType": "L_c",
  "mailingAddress": {
    "city": "Victoria",
    "province": "British Columbia",
    "streetAddress": "123 street st",
    "postalCode": "H0H0H0"
  },
  "isFacilityLocationDifferent": false
},
"operator": {
  "name": "Changed",
  "naics": "12345",
  "tradeName": "trade",
  "duns": "123456789",
  "bcCorporateRegistryNumber": "G4447393",
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
'
  where application_id=1 and version_number=1 and form_id=1;
update ggircs_portal.form_result set form_result = '{
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
  '
  where application_id=1 and version_number=1 and form_id=2;
update ggircs_portal.form_result set form_result = '[
  {
    "fuelRowId": 11,
    "quantity": 10,
    "fuelUnits": "t",
    "emissionCategoryRowId": 1
  },
  {
    "fuelRowId": 13,
    "quantity": 40120,
    "fuelUnits": "kL",
    "emissionCategoryRowId": 3
  }
]'
where application_id=1 and version_number=1 and form_id=3;

update ggircs_portal.form_result set form_result = '[
    {
      "productAmount": 87600,
      "productRowId": 29,
      "productUnits": "MWh",
      "productEmissions": 12,
      "requiresEmissionAllocation": true,
      "requiresProductAmount": true,
      "isCiipProduct": true
    }, {
      "productAmount": 12000,
      "productRowId": 26,
      "productUnits": "t",
      "productEmissions": 12,
      "requiresEmissionAllocation": true,
      "requiresProductAmount": true,
      "isCiipProduct": true
    }
  ]'
  where application_id=1 and version_number=1 and form_id=4;

insert into ggircs_portal.certification_url(id, certifier_url, application_id, version_number, send_certification_request, certifier_email)
overriding system value
values ('testpage', 'localhost:3004/certifier/certification-redirect?rowId=testpage', 1, 1, false, 'certifier@certi.fy');

commit;
