-- Because some views have required query params, there needs to be existing data on that page to test the final redirect.
-- Creates an organisation with a facility and relates that org to a reporter user

begin;

alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_request_for_access_email;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_access_approved_email;

alter table ggircs_portal.application
  disable trigger _send_draft_application_email;

alter table ggircs_portal.form_result
  disable trigger _100_timestamps;

-- Make it possible to set our own certification_url id:
alter table ggircs_portal.certification_url
  disable trigger _random_id;
-- Disable certification emails:
alter table ggircs_portal.certification_url
  disable trigger _certification_request_email;
alter table ggircs_portal.certification_url
  disable trigger _signed_by_certifier_email;
alter table ggircs_portal.certification_url
  disable trigger _recertification_request;

-- Creates an organisation and sets up test reporter with access:
delete from ggircs_portal.organisation where id = 200;
insert into ggircs_portal.organisation(id, operator_name) overriding system value values (200, 'MacDonalds Agriculture, Ltd.');
delete from ggircs_portal.ciip_user_organisation where user_id = 6 and organisation_id = 200;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 200, 'approved');

-- Creates a draft application for testing the /reporter/application, /reporter/new-application-disclaimer and /reporter/view-application pages
delete from ggircs_portal.facility where id = 100;
insert into ggircs_portal.facility(id, organisation_id, facility_name) overriding system value values (100, 200, 'Farm');
insert into ggircs_portal.application(id, facility_id, reporting_year) overriding system value values (101, 100, 2022);
insert into ggircs_portal.application_revision(application_id, version_number, legal_disclaimer_accepted, created_by) values (101, 1, 'true', 6);
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status, created_by) values (101, 1, 'draft', 6);

-- Creates an application for testing /certifier/certification-redirect and /certifier/certify
delete from ggircs_portal.facility where id = 111;
insert into ggircs_portal.facility(id, organisation_id, facility_name) overriding system value values (111, 200, 'Feed Factory');
insert into ggircs_portal.application(id, facility_id, reporting_year) overriding system value values (102, 111, 2022);
insert into ggircs_portal.application_revision(application_id, version_number, legal_disclaimer_accepted, created_by) values (102, 1, 'true', 6);
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status, created_by) values (102, 1, 'draft', 6);

-- Creates a submitted application for testing /analyst/application-review
delete from ggircs_portal.facility where id = 122;
insert into ggircs_portal.facility(id, organisation_id, facility_name) overriding system value values (122, 200, 'Feed Factory');
insert into ggircs_portal.application(id, facility_id, reporting_year) overriding system value values (103, 122, 2022);
insert into ggircs_portal.application_revision(application_id, version_number, legal_disclaimer_accepted, created_by) values (103, 1, 'true', 6);
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status, created_by) values (103, 1, 'draft', 6);


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
('[
  {
    "fuelRowId": 13,
    "quantity": 4,
    "fuelUnits": "t",
    "emissionCategoryRowId": 1
  },
  {
    "fuelRowId": 11,
    "quantity": 400,
    "fuelUnits": "kL",
    "emissionCategoryRowId": 2
  }
]'),
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

create or replace function e2e_test_initialize_form(
  form_id_start int,
  application_id_input int
)
returns boolean as
$function$
  declare
    temp_row record;
    loop_counter int default 1;
  begin
    -- Populate initial form results for each form section:
    for temp_row in
      select row_number() over () as index, form_id from ggircs_portal.ciip_application_wizard
    loop
      insert into ggircs_portal.form_result(id, form_id, application_id, version_number, form_result, created_by)
        overriding system value
        values (form_id_start + loop_counter, temp_row.form_id, application_id_input, 1, (select dummy_result from dummy_results where id = temp_row.index), 6);
      insert into ggircs_portal.form_result_status(application_id, form_id, form_result_status)
      values (application_id_input, temp_row.form_id, 'in review');

      loop_counter := loop_counter + 1;
    end loop;
  return 'true';
end;
$function$ language plpgsql strict volatile;
grant execute on function e2e_test_initialize_form to ciip_administrator, ciip_analyst, ciip_industry_user;

-- Initializes form results
select e2e_test_initialize_form(200, 101);
select e2e_test_initialize_form(300, 102);
select e2e_test_initialize_form(400, 103);

-- Create certification request for two of the applications
-- Problem? created_by is not set successfully
insert into ggircs_portal.certification_url(id, application_id, version_number, created_by, certifier_email, send_certification_request) values ('sss999', 102, 1, 6, 'certifier@certi.fy', 'false');
insert into ggircs_portal.certification_url(id, application_id, version_number, created_by, certifier_email, send_certification_request) values ('zzz888', 103, 1, 6, 'certifier@certi.fy', 'false');

-- Submit one of the applications
update ggircs_portal.certification_url set certification_signature = 'signed' where application_id = 103 and version_number = 1;
update ggircs_portal.application_revision_status set application_revision_status = 'submitted' where application_id = 103 and version_number = 1;

commit;
