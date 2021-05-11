
begin;

-- Start with clean tables
truncate swrs.report restart identity cascade;

-- Create sequence for address table
drop sequence if exists address_sequence;
create sequence address_sequence start 1;

/***********************************************
  Create dev data
***********************************************/
do $report$
  declare
    loop_modifier int := 0;
    loop_offset int;
  begin

    -- Create 1600 reports per year (1000 for load testing & 100 for each other organisation type)
    for year in 2018..2025 loop
      loop_offset := loop_modifier*1000;
      -- Load Testing
      for i in 1..1000 loop
        insert into swrs.report(id, imported_at, swrs_report_id, swrs_facility_id, swrs_organisation_id, reporting_period_duration, version, submission_date)
        values(i+loop_offset, now(), i+loop_offset, i, 1, year, 1, now());

        insert into swrs.organisation (id, report_id, swrs_organisation_id, business_legal_name, english_trade_name, cra_business_number, duns)
        values (i+loop_offset, i+loop_offset, 1, 'Load testing operator', 'Load testing operator', 111111111, 111111111);

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

        insert into swrs.emission (id, activity_id, facility_id, fuel_id, naics_id, organisation_id, report_id, unit_id, quantity, calculated_quantity, emission_category)
        values (i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, i+loop_offset, 1000, 1000, 'BC_ScheduleB_GeneralStationaryCombustionEmissions');

        insert into swrs.address (id, report_id, facility_id, organisation_id, swrs_facility_id, swrs_organisation_id, path_context, type, mailing_address_street_number, mailing_address_street_name, mailing_address_street_type, mailing_address_municipality, mailing_address_prov_terr_state, mailing_address_postal_code_zip_code, mailing_address_country)
        values
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 1, 'RegistrationData', 'Facility', '1234', 'Rainbow', 'road', 'Victoria',  'BC', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 1, 'RegistrationData', 'Organisation', '1234', 'Rainbow', 'road', 'Victoria',  'BC', 'H0H0H0', 'Canada'),
          ((select nextval('address_sequence')), i+loop_offset, i+loop_offset, i+loop_offset, i, 1, 'RegistrationData', 'Contact', '1234', 'Rainbow', 'road', 'Victoria',  'BC', 'H0H0H0', 'Canada');

        insert into swrs.contact (id, report_id, address_id, facility_id, organisation_id, path_context, contact_type, given_name, family_name, telephone_number, email_address, position)
        values (i+loop_offset, i+loop_offset, (select id from swrs.address where report_id = i+loop_offset and type='Contact'), i+loop_offset, i+loop_offset, 'RegistrationData', 'Operator Representative', 'Mario', 'Super', '8889876543', 'supermario@bowser.ca', 'CEO');

      end loop;
      loop_modifier = loop_modifier+1;
    end loop;
    raise notice 'Deploy Complete';
    raise notice '** Created % reports. **', (select count(*) from swrs.report);
    raise notice '** % reports for each year from 2018-2025. **', (select count(*)/8 from swrs.report);

  end
$report$;

commit;
