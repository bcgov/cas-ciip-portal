
begin;

-- Start with clean tables
truncate swrs.report restart identity cascade;

/***********************************************
  swrs_organisation data setup
***********************************************/

create temporary table org_helper (
  swrs_org_id int,
  org_name varchar(1000),
  cra_num int,
  duns int
) on commit drop;

insert into org_helper (swrs_org_id, org_name, cra_num, duns)
values
(1, 'SFO operator', 111111111, 111111111),
(2, 'LFO operator', 222222222, 222222222),
(3, 'Changes requested operator', 333333333, 333333333),
(4, 'Draft operator', 444444444, 444444444),
(5, 'Not started operator', 555555555, 555555555),
(6, 'Submitted operator', 666666666, 666666666);

/***********************************************
  Create dev data
***********************************************/
drop sequence if exists address_sequence;
create sequence address_sequence start 1;

do $report$
  declare
    loop_modifier int := 0;
    loop_offset int;
  begin

    -- Create 600 reports per year (100 for each organisation type)
    for year in 2018..2025 loop
      loop_offset := loop_modifier*600;
      -- SFO
      for i in 1001..1100 loop
        insert into swrs.report(id, imported_at, swrs_report_id, swrs_facility_id, swrs_organisation_id, reporting_period_duration, version, submission_date)
        values(i+loop_offset, now(), i+loop_offset, i, 1, year, 1, now());

        insert into swrs.organisation (id, report_id, swrs_organisation_id, business_legal_name, english_trade_name, cra_business_number, duns)
        values (i+loop_offset, i+loop_offset, 1, (select org_name from org_helper where swrs_org_id=1), (select org_name from org_helper where swrs_org_id=1), (select cra_num from org_helper where swrs_org_id=1), (select duns from org_helper where swrs_org_id=1));

        insert into swrs.facility (id, report_id, organisation_id, swrs_facility_id, facility_name, facility_type, facility_bc_ghg_id)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i, concat('facility ', i), 'SFO', (i)::varchar(1000));

        insert into swrs.naics (id, report_id, facility_id, registration_data_facility_id, swrs_facility_id, naics_code)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i, 111419);

        insert into swrs.activity (id, report_id, facility_id)
        values (i+loop_offset, i+loop_offset, i+loop_offset);

        insert into swrs.unit (id, activity_id)
        values (i+loop_offset, i+loop_offset);

        insert into swrs.fuel (id, report_id, unit_id, fuel_mapping_id, fuel_type, fuel_description, fuel_units, annual_fuel_amount)
        values (i+loop_offset, i+loop_offset, i+loop_offset, 6, 'Aviation Gasoline (kilolitres)', 'Aviation Gasoline (kilolitres)', 'kl', 1234);

        insert into swrs.emission (id, activity_id, facility_id, fuel_id, naics_id, organisation_id, report_id, unit_id, quantity, calculated_quantity, emission_category, gas_type)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, 1000, 1000, 'BC_ScheduleB_GeneralStationaryCombustionEmissions', 'CO2nonbio');

        insert into swrs.address (id, report_id, facility_id, organisation_id, swrs_facility_id, swrs_organisation_id, path_context, type, mailing_address_street_number, mailing_address_street_name, mailing_address_street_type, mailing_address_municipality, mailing_address_prov_terr_state, mailing_address_postal_code_zip_code, mailing_address_country)
        values
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 1, 'RegistrationData', 'Facility', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 1, 'RegistrationData', 'Organisation', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 1, 'RegistrationData', 'Contact', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada');

        insert into swrs.contact (id, report_id, address_id, facility_id, organisation_id, path_context, contact_type, given_name, family_name, telephone_number, email_address, position)
        values (i+loop_offset, i+loop_offset, (select id from swrs.address where report_id = i+loop_offset and type='Contact'), i+loop_offset, i+loop_offset, 'RegistrationData', 'Operator Representative', 'Mario', 'Super', '8889876543', 'supermario@bowser.ca', 'CEO');
      end loop;

      -- LFO
      for i in 1101..1133 loop
        insert into swrs.report(id, imported_at, swrs_report_id, swrs_facility_id, swrs_organisation_id, reporting_period_duration, version, submission_date)
        values(i+loop_offset, now(), i+loop_offset, i, 2, year, 1, now());

        insert into swrs.organisation (id, report_id, swrs_organisation_id, business_legal_name, english_trade_name, cra_business_number, duns)
        values (i+loop_offset, i+loop_offset, 2, (select org_name from org_helper where swrs_org_id=2), (select org_name from org_helper where swrs_org_id=2), (select cra_num from org_helper where swrs_org_id=2), (select duns from org_helper where swrs_org_id=2));

        insert into swrs.facility (id, report_id, organisation_id, swrs_facility_id, facility_name, facility_type, facility_bc_ghg_id)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i, concat('facility ', i), 'IF_a', (i)::varchar(1000));

        insert into swrs.naics (id, report_id, facility_id, registration_data_facility_id, swrs_facility_id, naics_code)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i, 111419);

        insert into swrs.activity (id, report_id, facility_id)
        values (i+loop_offset, i+loop_offset, i+loop_offset);

        insert into swrs.unit (id, activity_id)
        values (i+loop_offset, i+loop_offset);

        insert into swrs.fuel (id, report_id, unit_id, fuel_mapping_id, fuel_type, fuel_description, fuel_units, annual_fuel_amount)
        values (i+loop_offset, i+loop_offset, i+loop_offset, 6, 'Aviation Gasoline (kilolitres)', 'Aviation Gasoline (kilolitres)', 'kl', 1234);

        insert into swrs.emission (id, activity_id, facility_id, fuel_id, naics_id, organisation_id, report_id, unit_id, quantity, calculated_quantity, emission_category, gas_type)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, 1000, 1000, 'BC_ScheduleB_GeneralStationaryCombustionEmissions', 'CO2nonbio');

        insert into swrs.address (id, report_id, facility_id, organisation_id, swrs_facility_id, swrs_organisation_id, path_context, type, mailing_address_street_number, mailing_address_street_name, mailing_address_street_type, mailing_address_municipality, mailing_address_prov_terr_state, mailing_address_postal_code_zip_code, mailing_address_country)
        values
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 2, 'RegistrationData', 'Facility', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 2, 'RegistrationData', 'Organisation', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 2, 'RegistrationData', 'Contact', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada');

        insert into swrs.contact (id, report_id, address_id, facility_id, organisation_id, path_context, contact_type, given_name, family_name, telephone_number, email_address, position)
        values (i+loop_offset, i+loop_offset, (select id from swrs.address where report_id = i+loop_offset and type='Contact'), i+loop_offset, i+loop_offset, 'RegistrationData', 'Operator Representative', 'Mario', 'Super', '8889876543', 'supermario@bowser.ca', 'CEO');
      end loop;

      for i in 1134..1167 loop
        insert into swrs.report(id, imported_at, swrs_report_id, swrs_facility_id, swrs_organisation_id, reporting_period_duration, version, submission_date)
        values(i+loop_offset, now(), i+loop_offset, i, 2, year, 1, now());

        insert into swrs.organisation (id, report_id, swrs_organisation_id, business_legal_name, english_trade_name, cra_business_number, duns)
        values (i+loop_offset, i+loop_offset, 2, (select org_name from org_helper where swrs_org_id=2), (select org_name from org_helper where swrs_org_id=2), (select cra_num from org_helper where swrs_org_id=2), (select duns from org_helper where swrs_org_id=2));

        insert into swrs.facility (id, report_id, organisation_id, swrs_facility_id, facility_name, facility_type, facility_bc_ghg_id)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i, concat('facility ', i), 'IF_b', (i)::varchar(1000));

        insert into swrs.naics (id, report_id, facility_id, registration_data_facility_id, swrs_facility_id, naics_code)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i, 111419);

        insert into swrs.activity (id, report_id, facility_id)
        values (i+loop_offset, i+loop_offset, i+loop_offset);

        insert into swrs.unit (id, activity_id)
        values (i+loop_offset, i+loop_offset);

        insert into swrs.fuel (id, report_id, unit_id, fuel_mapping_id, fuel_type, fuel_description, fuel_units, annual_fuel_amount)
        values (i+loop_offset, i+loop_offset, i+loop_offset, 6, 'Aviation Gasoline (kilolitres)', 'Aviation Gasoline (kilolitres)', 'kl', 1234);

        insert into swrs.emission (id, activity_id, facility_id, fuel_id, naics_id, organisation_id, report_id, unit_id, quantity, calculated_quantity, emission_category, gas_type)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, 1000, 1000, 'BC_ScheduleB_GeneralStationaryCombustionEmissions', 'CO2nonbio');

        insert into swrs.address (id, report_id, facility_id, organisation_id, swrs_facility_id, swrs_organisation_id, path_context, type, mailing_address_street_number, mailing_address_street_name, mailing_address_street_type, mailing_address_municipality, mailing_address_prov_terr_state, mailing_address_postal_code_zip_code, mailing_address_country)
        values
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 2, 'RegistrationData', 'Facility', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 2, 'RegistrationData', 'Organisation', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 2, 'RegistrationData', 'Contact', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada');

        insert into swrs.contact (id, report_id, address_id, facility_id, organisation_id, path_context, contact_type, given_name, family_name, telephone_number, email_address, position)
        values (i+loop_offset, i+loop_offset, (select id from swrs.address where report_id = i+loop_offset and type='Contact'), i+loop_offset, i+loop_offset, 'RegistrationData', 'Operator Representative', 'Mario', 'Super', '8889876543', 'supermario@bowser.ca', 'CEO');
      end loop;

      for i in 1168..1200 loop
        insert into swrs.report(id, imported_at, swrs_report_id, swrs_facility_id, swrs_organisation_id, reporting_period_duration, version, submission_date)
        values(i+loop_offset, now(), i+loop_offset, i, 2, year, 1, now());

        insert into swrs.organisation (id, report_id, swrs_organisation_id, business_legal_name, english_trade_name, cra_business_number, duns)
        values (i+loop_offset, i+loop_offset, 2, (select org_name from org_helper where swrs_org_id=2), (select org_name from org_helper where swrs_org_id=2), (select cra_num from org_helper where swrs_org_id=2), (select duns from org_helper where swrs_org_id=2));

        insert into swrs.facility (id, report_id, organisation_id, swrs_facility_id, facility_name, facility_type, facility_bc_ghg_id)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i, concat('facility ', i), 'L_c', (i)::varchar(1000));

        insert into swrs.naics (id, report_id, facility_id, registration_data_facility_id, swrs_facility_id, naics_code)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i, 111419);

        insert into swrs.activity (id, report_id, facility_id)
        values (i+loop_offset, i+loop_offset, i+loop_offset);

        insert into swrs.unit (id, activity_id)
        values (i+loop_offset, i+loop_offset);

        insert into swrs.fuel (id, report_id, unit_id, fuel_mapping_id, fuel_type, fuel_description, fuel_units, annual_fuel_amount)
        values (i+loop_offset, i+loop_offset, i+loop_offset, 6, 'Aviation Gasoline (kilolitres)', 'Aviation Gasoline (kilolitres)', 'kl', 1234);

        insert into swrs.emission (id, activity_id, facility_id, fuel_id, naics_id, organisation_id, report_id, unit_id, quantity, calculated_quantity, emission_category, gas_type)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, 1000, 1000, 'BC_ScheduleB_GeneralStationaryCombustionEmissions', 'CO2nonbio');

        insert into swrs.address (id, report_id, facility_id, organisation_id, swrs_facility_id, swrs_organisation_id, path_context, type, mailing_address_street_number, mailing_address_street_name, mailing_address_street_type, mailing_address_municipality, mailing_address_prov_terr_state, mailing_address_postal_code_zip_code, mailing_address_country)
        values
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 2, 'RegistrationData', 'Facility', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 2, 'RegistrationData', 'Organisation', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 2, 'RegistrationData', 'Contact', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada');

        insert into swrs.contact (id, report_id, address_id, facility_id, organisation_id, path_context, contact_type, given_name, family_name, telephone_number, email_address, position)
        values (i+loop_offset, i+loop_offset, (select id from swrs.address where report_id = i+loop_offset and type='Contact'), i+loop_offset, i+loop_offset, 'RegistrationData', 'Operator Representative', 'Mario', 'Super', '8889876543', 'supermario@bowser.ca', 'CEO');
      end loop;

      -- Changes Requested
      for i in 1201..1300 loop
        insert into swrs.report(id, imported_at, swrs_report_id, swrs_facility_id, swrs_organisation_id, reporting_period_duration, version, submission_date)
        values(i+loop_offset, now(), i+loop_offset, i, 3, year, 1, now());

        insert into swrs.organisation (id, report_id, swrs_organisation_id, business_legal_name, english_trade_name, cra_business_number, duns)
        values (i+loop_offset, i+loop_offset, 3, (select org_name from org_helper where swrs_org_id=3), (select org_name from org_helper where swrs_org_id=3), (select cra_num from org_helper where swrs_org_id=3), (select duns from org_helper where swrs_org_id=3));

        insert into swrs.facility (id, report_id, organisation_id, swrs_facility_id, facility_name, facility_type, facility_bc_ghg_id)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i, concat('facility ', i), 'SFO', (i)::varchar(1000));

        insert into swrs.naics (id, report_id, facility_id, registration_data_facility_id, swrs_facility_id, naics_code)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i, 111419);

        insert into swrs.activity (id, report_id, facility_id)
        values (i+loop_offset, i+loop_offset, i+loop_offset);

        insert into swrs.unit (id, activity_id)
        values (i+loop_offset, i+loop_offset);

        insert into swrs.fuel (id, report_id, unit_id, fuel_mapping_id, fuel_type, fuel_description, fuel_units, annual_fuel_amount)
        values (i+loop_offset, i+loop_offset, i+loop_offset, 6, 'Aviation Gasoline (kilolitres)', 'Aviation Gasoline (kilolitres)', 'kl', 1234);

        insert into swrs.emission (id, activity_id, facility_id, fuel_id, naics_id, organisation_id, report_id, unit_id, quantity, calculated_quantity, emission_category, gas_type)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, 1000, 1000, 'BC_ScheduleB_GeneralStationaryCombustionEmissions', 'CO2nonbio');

        insert into swrs.address (id, report_id, facility_id, organisation_id, swrs_facility_id, swrs_organisation_id, path_context, type, mailing_address_street_number, mailing_address_street_name, mailing_address_street_type, mailing_address_municipality, mailing_address_prov_terr_state, mailing_address_postal_code_zip_code, mailing_address_country)
        values
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 3, 'RegistrationData', 'Facility', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 3, 'RegistrationData', 'Organisation', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 3, 'RegistrationData', 'Contact', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada');

        insert into swrs.contact (id, report_id, address_id, facility_id, organisation_id, path_context, contact_type, given_name, family_name, telephone_number, email_address, position)
        values (i+loop_offset, i+loop_offset, (select id from swrs.address where report_id = i+loop_offset and type='Contact'), i+loop_offset, i+loop_offset, 'RegistrationData', 'Operator Representative', 'Mario', 'Super', '8889876543', 'supermario@bowser.ca', 'CEO');
      end loop;

      -- Draft
      for i in 1301..1400 loop
        insert into swrs.report(id, imported_at, swrs_report_id, swrs_facility_id, swrs_organisation_id, reporting_period_duration, version, submission_date)
        values(i+loop_offset, now(), i+loop_offset, i, 4, year, 1, now());

        insert into swrs.organisation (id, report_id, swrs_organisation_id, business_legal_name, english_trade_name, cra_business_number, duns)
        values (i+loop_offset, i+loop_offset, 4, (select org_name from org_helper where swrs_org_id=4), (select org_name from org_helper where swrs_org_id=4), (select cra_num from org_helper where swrs_org_id=4), (select duns from org_helper where swrs_org_id=4));

        insert into swrs.facility (id, report_id, organisation_id, swrs_facility_id, facility_name, facility_type, facility_bc_ghg_id)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i, concat('facility ', i), 'SFO', (i)::varchar(1000));

        insert into swrs.naics (id, report_id, facility_id, registration_data_facility_id, swrs_facility_id, naics_code)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i, 111419);

        insert into swrs.activity (id, report_id, facility_id)
        values (i+loop_offset, i+loop_offset, i+loop_offset);

        insert into swrs.unit (id, activity_id)
        values (i+loop_offset, i+loop_offset);

        insert into swrs.fuel (id, report_id, unit_id, fuel_mapping_id, fuel_type, fuel_description, fuel_units, annual_fuel_amount)
        values (i+loop_offset, i+loop_offset, i+loop_offset, 6, 'Aviation Gasoline (kilolitres)', 'Aviation Gasoline (kilolitres)', 'kl', 1234);

        insert into swrs.emission (id, activity_id, facility_id, fuel_id, naics_id, organisation_id, report_id, unit_id, quantity, calculated_quantity, emission_category, gas_type)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, 1000, 1000, 'BC_ScheduleB_GeneralStationaryCombustionEmissions', 'CO2nonbio');

        insert into swrs.address (id, report_id, facility_id, organisation_id, swrs_facility_id, swrs_organisation_id, path_context, type, mailing_address_street_number, mailing_address_street_name, mailing_address_street_type, mailing_address_municipality, mailing_address_prov_terr_state, mailing_address_postal_code_zip_code, mailing_address_country)
        values
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 4, 'RegistrationData', 'Facility', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 4, 'RegistrationData', 'Organisation', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 4, 'RegistrationData', 'Contact', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada');

        insert into swrs.contact (id, report_id, address_id, facility_id, organisation_id, path_context, contact_type, given_name, family_name, telephone_number, email_address, position)
        values (i+loop_offset, i+loop_offset, (select id from swrs.address where report_id = i+loop_offset and type='Contact'), i+loop_offset, i+loop_offset, 'RegistrationData', 'Operator Representative', 'Mario', 'Super', '8889876543', 'supermario@bowser.ca', 'CEO');
      end loop;

      -- Not Started
      for i in 1401..1500 loop
        insert into swrs.report(id, imported_at, swrs_report_id, swrs_facility_id, swrs_organisation_id, reporting_period_duration, version, submission_date)
        values(i+loop_offset, now(), i+loop_offset, i, 5, year, 1, now());

        insert into swrs.organisation (id, report_id, swrs_organisation_id, business_legal_name, english_trade_name, cra_business_number, duns)
        values (i+loop_offset, i+loop_offset, 5, (select org_name from org_helper where swrs_org_id=5), (select org_name from org_helper where swrs_org_id=5), (select cra_num from org_helper where swrs_org_id=5), (select duns from org_helper where swrs_org_id=5));

        insert into swrs.facility (id, report_id, organisation_id, swrs_facility_id, facility_name, facility_type, facility_bc_ghg_id)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i, concat('facility ', i), 'SFO', (i)::varchar(1000));

        insert into swrs.naics (id, report_id, facility_id, registration_data_facility_id, swrs_facility_id, naics_code)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i, 111419);

        insert into swrs.activity (id, report_id, facility_id)
        values (i+loop_offset, i+loop_offset, i+loop_offset);

        insert into swrs.unit (id, activity_id)
        values (i+loop_offset, i+loop_offset);

        insert into swrs.fuel (id, report_id, unit_id, fuel_mapping_id, fuel_type, fuel_description, fuel_units, annual_fuel_amount)
        values (i+loop_offset, i+loop_offset, i+loop_offset, 6, 'Aviation Gasoline (kilolitres)', 'Aviation Gasoline (kilolitres)', 'kl', 1234);

        insert into swrs.emission (id, activity_id, facility_id, fuel_id, naics_id, organisation_id, report_id, unit_id, quantity, calculated_quantity, emission_category, gas_type)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, 1000, 1000, 'BC_ScheduleB_GeneralStationaryCombustionEmissions', 'CO2nonbio');

        insert into swrs.address (id, report_id, facility_id, organisation_id, swrs_facility_id, swrs_organisation_id, path_context, type, mailing_address_street_number, mailing_address_street_name, mailing_address_street_type, mailing_address_municipality, mailing_address_prov_terr_state, mailing_address_postal_code_zip_code, mailing_address_country)
        values
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 5, 'RegistrationData', 'Facility', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 5, 'RegistrationData', 'Organisation', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 5, 'RegistrationData', 'Contact', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada');

        insert into swrs.contact (id, report_id, address_id, facility_id, organisation_id, path_context, contact_type, given_name, family_name, telephone_number, email_address, position)
        values (i+loop_offset, i+loop_offset, (select id from swrs.address where report_id = i+loop_offset and type='Contact'), i+loop_offset, i+loop_offset, 'RegistrationData', 'Operator Representative', 'Mario', 'Super', '8889876543', 'supermario@bowser.ca', 'CEO');
      end loop;

      -- Submitted
      for i in 1501..1600 loop
        insert into swrs.report(id, imported_at, swrs_report_id, swrs_facility_id, swrs_organisation_id, reporting_period_duration, version, submission_date)
        values(i+loop_offset, now(), i+loop_offset, i, 6, year, 1, now());

        insert into swrs.organisation (id, report_id, swrs_organisation_id, business_legal_name, english_trade_name, cra_business_number, duns)
        values (i+loop_offset, i+loop_offset, 6, (select org_name from org_helper where swrs_org_id=6), (select org_name from org_helper where swrs_org_id=6), (select cra_num from org_helper where swrs_org_id=6), (select duns from org_helper where swrs_org_id=6));

        insert into swrs.facility (id, report_id, organisation_id, swrs_facility_id, facility_name, facility_type, facility_bc_ghg_id)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i, concat('facility ', i), 'SFO', (i)::varchar(1000));

        insert into swrs.naics (id, report_id, facility_id, registration_data_facility_id, swrs_facility_id, naics_code)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i, 111419);

        insert into swrs.activity (id, report_id, facility_id)
        values (i+loop_offset, i+loop_offset, i+loop_offset);

        insert into swrs.unit (id, activity_id)
        values (i+loop_offset, i+loop_offset);

        insert into swrs.fuel (id, report_id, unit_id, fuel_mapping_id, fuel_type, fuel_description, fuel_units, annual_fuel_amount)
        values (i+loop_offset, i+loop_offset, i+loop_offset, 6, 'Aviation Gasoline (kilolitres)', 'Aviation Gasoline (kilolitres)', 'kl', 1234);

        insert into swrs.emission (id, activity_id, facility_id, fuel_id, naics_id, organisation_id, report_id, unit_id, quantity, calculated_quantity, emission_category, gas_type)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, 1000, 1000, 'BC_ScheduleB_GeneralStationaryCombustionEmissions', 'CO2nonbio');

        insert into swrs.address (id, report_id, facility_id, organisation_id, swrs_facility_id, swrs_organisation_id, path_context, type, mailing_address_street_number, mailing_address_street_name, mailing_address_street_type, mailing_address_municipality, mailing_address_prov_terr_state, mailing_address_postal_code_zip_code, mailing_address_country)
        values
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 6, 'RegistrationData', 'Facility', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 6, 'RegistrationData', 'Organisation', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 6, 'RegistrationData', 'Contact', '1234', 'Rainbow', 'road', 'Victoria',  'British Columbia', 'H0H0H0', 'Canada');

        insert into swrs.contact (id, report_id, address_id, facility_id, organisation_id, path_context, contact_type, given_name, family_name, telephone_number, email_address, position)
        values (i+loop_offset, i+loop_offset, (select id from swrs.address where report_id = i+loop_offset and type='Contact'), i+loop_offset, i+loop_offset, 'RegistrationData', 'Operator Representative', 'Mario', 'Super', '8889876543', 'supermario@bowser.ca', 'CEO');
      end loop;
      loop_modifier = loop_modifier+1;
    end loop;
    raise notice 'Deploy Complete';
    raise notice '** Created % reports. **', (select count(*) from swrs.report);
    raise notice '** % reports for each year from 2018-2025. **', (select count(*)/8 from swrs.report);
    raise notice '** 100 per year for each operator type. **';
    raise notice '** Operator types: {%} **', (select string_agg(quote_literal(org_name), ', ') as Orgs from org_helper);

  end
$report$;

commit;
