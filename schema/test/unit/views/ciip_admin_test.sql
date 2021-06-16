set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(63);

truncate ggircs_portal.application restart identity cascade;

-- Set time where application is open, reporting year 2020
select mocks.set_mocked_time_in_transaction('2021-07-03 00:00:00.000000-07'::timestamptz);

select ggircs_portal.create_application_mutation_chain(1);
update ggircs_portal.form_result
  set form_result = $$
  {
    "facility": {
      "facilityName": "Test Facility",
      "facilityType": "SFO"
    },
    "operator": {
      "name": "Testy Tester",
      "naics": "1000",
      "tradeName": "Trade Test",
      "mailingAddress": {
        "city": "Victoria",
        "province": "BC",
        "postalCode": "h0h0h0",
        "streetAddress": "123 outtamy way"
      },
      "bcCorporateRegistryNumber": "abc1231231"
    },
    "operationalRepresentative": {
      "email": "test@test.com",
      "phone": "1234567890",
      "lastName": "Sedin",
      "position": "Captain",
      "firstName": "Henrik",
      "mailingAddress": {
        "city": "Vancouver",
        "province": "BC",
        "postalCode": "h0h0h1",
        "streetAddress": "555 evergreen terrace"
      }
    },
    "primaryContact": {
      "email": "bob@loblaw.com",
      "phone": "1234567890",
      "firstName": "Bob",
      "lastName": "Loblaw",
      "position": "Attorney",
      "organization": "Bob Loblaw's Law Blog"
    },
    "secondaryContact": {
      "email": "jjjj@dailybugle.com",
      "phone": "1234567890",
      "firstName": "John Jonah Jr.",
      "lastName": "Jameson",
      "position": "Editor in chief",
      "organization": "Daily Bugle"
    }
  }
  $$
  where application_id=1 and version_number=1;

-- 2018 and 2019 data
-- 2018 form schema is created by another application, so it's not inserted by our prod data script
insert into ggircs_portal.form_json(name, slug, short_name, description, form_json, prepopulate_from_ciip, prepopulate_from_swrs)
values ('2018admin', 'admin-2018', 'admin', 'admin', '{}', false, false);

insert into ggircs_portal.application(facility_id, reporting_year) values (2, 2018), (2, 2019);
insert into ggircs_portal.application_revision(application_id, version_number) values
  ((select id from ggircs_portal.application where facility_id = 2 and reporting_year = 2018),1),
  ((select id from ggircs_portal.application where facility_id = 2 and reporting_year = 2019),1);
insert into ggircs_portal.form_result(application_id, version_number, form_id, form_result)
values
  (
    (select id from ggircs_portal.application where facility_id = 2 and reporting_year = 2018),1,
    (select id from ggircs_portal.form_json where slug = 'admin-2018'),
    '{"applicationMetadata": {"sourceFileName": "2018file", "sourceSHA1": "2018sha"}}'
  ),
  (
  (select id from ggircs_portal.application where facility_id = 2 and reporting_year = 2019),1,
  (select id from ggircs_portal.form_json where slug = 'admin'), -- 2019 admin schema
  '{"facility": {"bcghgid": "985", "facilityName": "Test Facility 2019", "facilityType": "EIO"}, "operator": {"name": "Testy Tester", "naics": "1000", "tradeName": "Trade Test", "mailingAddress": {"city": "Victoria", "province": "BC", "postalCode": "h0h0h0", "streetAddress": "123 outtamy way"}, "bcCorporateRegistryNumber": "abc1231231"}, "operationalRepresentative": {"email": "test@test.com", "phone": "1234567890", "lastName": "Sedin", "position": "Captain", "firstName": "Henrik", "mailingAddress": {"city": "Vancouver", "province": "BC", "postalCode": "h0h0h1", "streetAddress": "555 evergreen terrace"}}}'
  );


select has_view('ggircs_portal', 'ciip_admin', 'There is a ciip_admin view');

select has_column('ggircs_portal', 'ciip_admin', 'application_id','ciip_admin view has column application_id');
select has_column('ggircs_portal', 'ciip_admin', 'version_number','ciip_admin view has column version_number');
select has_column('ggircs_portal', 'ciip_admin', 'reporting_year','ciip_admin view has column reporting_year');
select has_column('ggircs_portal', 'ciip_admin', 'bcghgid','ciip_admin view has column bcghgid');
select has_column('ggircs_portal', 'ciip_admin', 'facility_name','ciip_admin view has column facility_name');
select has_column('ggircs_portal', 'ciip_admin', 'facility_type','ciip_admin view has column facility_type');
select has_column('ggircs_portal', 'ciip_admin', 'facility_description','ciip_admin view has column facility_description');
select has_column('ggircs_portal', 'ciip_admin', 'operator_name','ciip_admin view has column operator_name');
select has_column('ggircs_portal', 'ciip_admin', 'naics','ciip_admin view has column naics');
select has_column('ggircs_portal', 'ciip_admin', 'operator_trade_name','ciip_admin view has column operator_trade_name');
select has_column('ggircs_portal', 'ciip_admin', 'bc_corporate_registry_number','ciip_admin view has column bc_corporate_registry_number');
select has_column('ggircs_portal', 'ciip_admin', 'is_bc_corporate_registry_number_valid','ciip_admin view has column bc_corporate_registry_number');
select has_column('ggircs_portal', 'ciip_admin', 'org_book_legal_name','ciip_admin view has column org_book_legal_name');
select has_column('ggircs_portal', 'ciip_admin', 'duns','ciip_admin view has column duns');
select has_column('ggircs_portal', 'ciip_admin', 'operator_city','ciip_admin view has column operator_city');
select has_column('ggircs_portal', 'ciip_admin', 'operator_province','ciip_admin view has column operator_province');
select has_column('ggircs_portal', 'ciip_admin', 'operator_postal_code','ciip_admin view has column operator_postal_code');
select has_column('ggircs_portal', 'ciip_admin', 'operator_street_address','ciip_admin view has column operator_street_address');

select has_column('ggircs_portal', 'ciip_admin', 'operational_representative_email','ciip_admin view has column operational_representative_email');
select has_column('ggircs_portal', 'ciip_admin', 'operational_representative_phone','ciip_admin view has column operational_representative_phone');
select has_column('ggircs_portal', 'ciip_admin', 'operational_representative_last_name','ciip_admin view has column operational_representative_last_name');
select has_column('ggircs_portal', 'ciip_admin', 'operational_representative_first_name','ciip_admin view has column operational_representative_first_name');
select has_column('ggircs_portal', 'ciip_admin', 'operational_representative_position','ciip_admin view has column operational_representative_position');
select has_column('ggircs_portal', 'ciip_admin', 'operational_representative_city','ciip_admin view has column operational_representative_city');
select has_column('ggircs_portal', 'ciip_admin', 'operational_representative_province','ciip_admin view has column operational_representative_province');
select has_column('ggircs_portal', 'ciip_admin', 'operational_representative_postal_code','ciip_admin view has column operational_representative_postal_code');
select has_column('ggircs_portal', 'ciip_admin', 'operational_representative_street_address','ciip_admin view has column operational_representative_street_address');

select has_column('ggircs_portal', 'ciip_admin', 'primary_contact_email','ciip_admin view has column primary_contact_email');
select has_column('ggircs_portal', 'ciip_admin', 'primary_contact_phone','ciip_admin view has column primary_contact_phone');
select has_column('ggircs_portal', 'ciip_admin', 'primary_contact_last_name','ciip_admin view has column primary_contact_last_name');
select has_column('ggircs_portal', 'ciip_admin', 'primary_contact_first_name','ciip_admin view has column primary_contact_first_name');
select has_column('ggircs_portal', 'ciip_admin', 'primary_contact_position','ciip_admin view has column primary_contact_position');
select has_column('ggircs_portal', 'ciip_admin', 'primary_contact_organization','ciip_admin view has column primary_contact_organization');

select has_column('ggircs_portal', 'ciip_admin', 'secondary_contact_email','ciip_admin view has column secondary_contact_email');
select has_column('ggircs_portal', 'ciip_admin', 'secondary_contact_phone','ciip_admin view has column secondary_contact_phone');
select has_column('ggircs_portal', 'ciip_admin', 'secondary_contact_last_name','ciip_admin view has column secondary_contact_last_name');
select has_column('ggircs_portal', 'ciip_admin', 'secondary_contact_first_name','ciip_admin view has column secondary_contact_first_name');
select has_column('ggircs_portal', 'ciip_admin', 'secondary_contact_position','ciip_admin view has column secondary_contact_position');
select has_column('ggircs_portal', 'ciip_admin', 'secondary_contact_organization','ciip_admin view has column secondary_contact_organization');

select has_column('ggircs_portal', 'ciip_admin', 'certifying_official_email','ciip_admin view has column certifying_official_email');
select has_column('ggircs_portal', 'ciip_admin', 'certifying_official_phone','ciip_admin view has column certifying_official_phone');
select has_column('ggircs_portal', 'ciip_admin', 'certifying_official_last_name','ciip_admin view has column certifying_official_last_name');
select has_column('ggircs_portal', 'ciip_admin', 'certifying_official_first_name','ciip_admin view has column certifying_official_first_name');
select has_column('ggircs_portal', 'ciip_admin', 'certifying_official_position','ciip_admin view has column certifying_official_position');
select has_column('ggircs_portal', 'ciip_admin', 'certifying_official_city','ciip_admin view has column certifying_official_city');
select has_column('ggircs_portal', 'ciip_admin', 'certifying_official_province','ciip_admin view has column certifying_official_province');
select has_column('ggircs_portal', 'ciip_admin', 'certifying_official_postal_code','ciip_admin view has column certifying_official_postal_code');
select has_column('ggircs_portal', 'ciip_admin', 'certifying_official_street_address','ciip_admin view has column certifying_official_street_address');

select has_column('ggircs_portal', 'ciip_admin', 'application_source_filename','ciip_admin view has column application_source_filename');
select has_column('ggircs_portal', 'ciip_admin', 'application_source_sha1','ciip_admin view has column application_source_sha1');
select has_column('ggircs_portal', 'ciip_admin', 'application_imported_at','ciip_admin view has column application_imported_at');
select has_column('ggircs_portal', 'ciip_admin', 'application_type','ciip_admin view has column application_type');
select has_column('ggircs_portal', 'ciip_admin', 'application_signature_date','ciip_admin view has column application_signature_date');
select has_column('ggircs_portal', 'ciip_admin', 'certifying_official_phone','ciip_admin view has column certifying_official_phone');

select has_column('ggircs_portal', 'ciip_admin', 'comments','ciip_admin view has column comments');

select results_eq(
  $$
    select facility_name, bcghgid, facility_type from ggircs_portal.ciip_admin where application_id=1 and version_number=1
  $$,
  $$
    values ('Test Facility'::varchar, (select bcghgid from ggircs_portal.facility where id=1), 'SFO'::varchar) -- bcghgid comes from facility table starting with 2020 admin data
  $$,
  'ciip_admin view returns the right facility data'
);

select results_eq(
  $$
    select
      operator_name,
      naics,
      operator_trade_name,
      bc_corporate_registry_number,
      operator_city,
      operator_province,
      operator_postal_code,
      operator_street_address
    from ggircs_portal.ciip_admin where application_id=1 and version_number=1
  $$,
  $$
    select
      'Testy Tester'::varchar,
      '1000'::varchar,
      'Trade Test'::varchar,
      'abc1231231'::varchar,
      'Victoria'::varchar,
      'BC'::varchar,
      'h0h0h0'::varchar,
      '123 outtamy way'::varchar
  $$,
  'ciip_admin view returns the right operator data'
);

select results_eq(
  $$
    select
      operational_representative_email,
      operational_representative_phone,
      operational_representative_first_name,
      operational_representative_last_name,
      operational_representative_position,
      operational_representative_city,
      operational_representative_province,
      operational_representative_postal_code,
      operational_representative_street_address
    from ggircs_portal.ciip_admin where application_id=1 and version_number=1
  $$,
  $$
    select
      'test@test.com'::varchar,
      '1234567890'::varchar,
      'Henrik'::varchar,
      'Sedin'::varchar,
      'Captain'::varchar,
      'Vancouver'::varchar,
      'BC'::varchar,
      'h0h0h1'::varchar,
      '555 evergreen terrace'::varchar
  $$,
  'ciip_admin view returns the right operational_representative data'
);

select results_eq(
  $$
    select
      primary_contact_first_name,
      primary_contact_last_name,
      primary_contact_email,
      primary_contact_phone,
      primary_contact_position,
      primary_contact_organization
    from ggircs_portal.ciip_admin
    where application_id=1 and version_number=1
  $$,
  $$
    values (
      'Bob'::varchar,
      'Loblaw'::varchar,
      'bob@loblaw.com'::varchar,
      '1234567890'::varchar,
      'Attorney'::varchar,
      'Bob Loblaw''s Law Blog'::varchar
    )
  $$,
  'ciip_admin view returns the right primary contact data'
);

select results_eq(
  $$
    select
      secondary_contact_first_name,
      secondary_contact_last_name,
      secondary_contact_email,
      secondary_contact_phone,
      secondary_contact_position,
      secondary_contact_organization
    from ggircs_portal.ciip_admin
    where application_id=1 and version_number=1
  $$,
  $$
    values (
      'John Jonah Jr.'::varchar,
      'Jameson'::varchar,
      'jjjj@dailybugle.com'::varchar,
      '1234567890'::varchar,
      'Editor in chief'::varchar,
      'Daily Bugle'::varchar
    )
  $$,
  'ciip_admin view returns the right secondary contact data'
);

select results_eq(
  $$
    select application_source_filename, application_source_sha1 from ggircs_portal.ciip_admin where application_id = 2
  $$,
  $$
    select '2018file'::varchar, '2018sha'::varchar
  $$,
  'ciip_admin view returns data for the 2018 schema'
);

select results_eq(
  $$
    select facility_name, bcghgid, facility_type from ggircs_portal.ciip_admin
    where application_id=(select id from ggircs_portal.application where facility_id = 2 and reporting_year = 2019)
    and version_number=1
  $$,
  $$
    select 'Test Facility 2019'::varchar, '985'::varchar, 'EIO'::varchar
  $$,
  'ciip_admin view returns data for the 2019 schema'
);

select finish();

rollback;
