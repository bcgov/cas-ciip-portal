set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(4);

truncate ggircs_portal.application restart identity cascade;
alter table ggircs_portal.application
  disable trigger _send_draft_application_email;

-- Set time where application is open, reporting year 2019
select mocks.set_mocked_time_in_transaction('2020-07-03 00:00:00.000000-07'::timestamptz);

select ggircs_portal.create_application_mutation_chain(1);
update ggircs_portal.form_result
  set form_result = '{"facility": {"bcghgid": "985", "facilityName": "Test Facility", "facilityType": "EIO"}, "operator": {"name": "Testy Tester", "naics": "1000", "tradeName": "Trade Test", "mailingAddress": {"city": "Victoria", "province": "BC", "postalCode": "h0h0h0", "streetAddress": "123 outtamy way"}, "bcCorporateRegistryNumber": "abc1231231"}, "operationalRepresentative": {"email": "test@test.com", "phone": "1234567890", "lastName": "Sedin", "position": "Captain", "firstName": "Henrik", "mailingAddress": {"city": "Vancouver", "province": "BC", "postalCode": "h0h0h1", "streetAddress": "555 evergreen terrace"}}}'
  where application_id=1 and version_number=1;

select has_view('ggircs_portal', 'ciip_admin', 'There is a ciip_admin view');

select results_eq(
  $$
    select facility_name, bcghgid, facility_type from ggircs_portal.ciip_admin where application_id=1 and version_number=1
  $$,
  $$
    select 'Test Facility'::varchar, '985'::varchar, 'EIO'::varchar
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

select finish();

rollback;
