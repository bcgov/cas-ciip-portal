set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(16);

select has_function(
  'ggircs_portal_private', 'refresh_swrs_version_data',
  'Function refresh_swrs_version_data should exist'
);

-- Init tests
truncate ggircs_portal.organisation restart identity cascade;
do $$
  declare disable_triggers json;
  begin
    disable_triggers := '
      {
        "application": ["_send_draft_application_email"],
        "application_revision_status": ["_status_change_email"],
        "ciip_user": ["_welcome_email"],
        "form_result": ["_100_timestamps"]
      }
    ';
    perform test_helper.modify_triggers('disable', disable_triggers);
  end;
$$;

select test_helper.mock_open_window();
select test_helper.create_test_users();

select test_helper.create_applications(4, True, True);

-- manipulate report_id, swrs_report_id and swrs_facility_id values to easily test the proper swrs data was imported
update ggircs_portal.facility set swrs_facility_id = 1 where id = 1;
update ggircs_portal.facility set swrs_facility_id = 2 where id = 2;
update ggircs_portal.facility set swrs_facility_id = 3 where id = 3;
update ggircs_portal.facility set swrs_facility_id = 5 where id = 4;

update swrs.report set swrs_facility_id = 1, version= '1', reporting_period_duration = (select reporting_year from ggircs_portal.opened_reporting_year()) where id = 1;
update swrs.report set swrs_facility_id = 2, version='1', reporting_period_duration = (select reporting_year from ggircs_portal.opened_reporting_year()) where id = 2;
update swrs.report set swrs_facility_id = 3, version='1', reporting_period_duration = (select reporting_year from ggircs_portal.opened_reporting_year()) where id = 3;
update swrs.report set swrs_facility_id = 5, version='1', reporting_period_duration = (select reporting_year from ggircs_portal.opened_reporting_year()) where id = 5;

-- Set different swrs_report_version on applications 1&2, this should trigger the refresh function for these applications
update ggircs_portal.application set swrs_report_version = '99', swrs_report_id = (
  select r.swrs_report_id
  from swrs.report r
  join ggircs_portal.facility f
  on r.swrs_facility_id = f.swrs_facility_id
  join ggircs_portal.application a
  on a.facility_id = f.id
  and r.reporting_period_duration = (select reporting_year from ggircs_portal.opened_reporting_year())
  and a.id = 1) where id = 1;
update ggircs_portal.application set swrs_report_version = '100', swrs_report_id = (
  select r.swrs_report_id
  from swrs.report r
  join ggircs_portal.facility f
  on r.swrs_facility_id = f.swrs_facility_id
  join ggircs_portal.application a
  on a.facility_id = f.id
  and r.reporting_period_duration = (select reporting_year from ggircs_portal.opened_reporting_year())
  and a.id=2) where id = 2;

-- Do not change the swrs_report_version for applications 3&4, this should not trigger the refresh function for these applications
update ggircs_portal.application set swrs_report_version = '1', swrs_report_id = (
  select r.swrs_report_id
  from swrs.report r
  join ggircs_portal.facility f
  on r.swrs_facility_id = f.swrs_facility_id
  join ggircs_portal.application a
  on a.facility_id = f.id
  and r.reporting_period_duration = (select reporting_year from ggircs_portal.opened_reporting_year())
  and a.id = 3) where id = 3;
update ggircs_portal.application set swrs_report_version = '1', swrs_report_id = (
  select r.swrs_report_id
  from swrs.report r
  join ggircs_portal.facility f
  on r.swrs_facility_id = f.swrs_facility_id
  join ggircs_portal.application a
  on a.facility_id = f.id
  and r.reporting_period_duration = (select reporting_year from ggircs_portal.opened_reporting_year())
  and a.id = 4) where id = 4;

update swrs.emission set report_id = 1 where id = 1;
update swrs.emission set report_id = 2 where id = 2;
update swrs.emission set report_id = 3 where id = 3;
update swrs.emission set report_id = 4 where id = 4;

update swrs.fuel set report_id = 1 where id = 6;
update swrs.fuel set report_id = 2 where id = 7;
update swrs.fuel set report_id = 3 where id = 8;
update swrs.fuel set report_id = 4 where id = 9;

-- Create version 0 for applications 1,3,4
insert into ggircs_portal.application_revision(application_id, version_number)
  values (1, 0), (3, 0), (4, 0);
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (1, 0, 'submitted'),(3, 0, 'submitted'),(4, 0, 'submitted');

insert into ggircs_portal.form_result(application_id, version_number, form_id, form_result)
  values
    (1, 0, 1, '{}'),
    (1, 0, 2, '{}'),
    (1, 0, 3, '[]'),
    (1, 0, 4, '[]'),
    (3, 0, 1, '{}'),
    (3, 0, 2, '{}'),
    (3, 0, 3, '[]'),
    (3, 0, 4, '[]'),
    (4, 0, 1, '{}'),
    (4, 0, 2, '{}'),
    (4, 0, 3, '[]'),
    (4, 0, 4, '[]');


-- set updated_at values in order to assert changes on applications 1 & 2 (should update) / 3 & 4 (shouldn't update)
update ggircs_portal.form_result set updated_at = now() - interval '3 days' where application_id < 3;
update ggircs_portal.form_result set updated_at = now() - interval '1 day' where application_id >= 3;

select test_helper.modify_triggers('enable');

select is(
  (select count(*) from ggircs_portal.form_result where application_id in (1,3,4) and version_number=0),
  12::bigint,
  'There are version 0 form results for applications 1, 3 & 4'
);

select is_empty(
  $$
    select * from ggircs_portal.form_result where application_id=2 and version_number=0
  $$,
  'There are no version 0 form_results for application with id = 2'
);

-- Call refresh function
select ggircs_portal_private.refresh_swrs_version_data();

select isnt_empty(
  $$
    select * from ggircs_portal.form_result where application_id=2 and version_number=0
  $$,
  'Refresh function created version 0 form_results for application with id = 2'
);

select is(
  (select facility_name from ggircs_portal.ciip_admin where application_id=2 and version_number=0),
  (select facility_name from ggircs_portal.get_swrs_facility_data(2, (select reporting_year from ggircs_portal.opened_reporting_year()))),
  'Refresh function added facility data to the admin form for application with id = 2'
);

select is(
  ((select updated_at from ggircs_portal.form_result where application_id=3 and version_number=0 and form_id=1) < now() - interval '12 hours'),
  true::boolean,
  'Application with id 3 was not updated by the refresh function because report.version === application.swrs_report_version'
);

select is(
  ((select updated_at from ggircs_portal.form_result where application_id=4 and version_number=0 and form_id=1) < now() - interval '12 hours'),
  true::boolean,
  'Application with id 4 was not updated by the refresh function because report.version === application.swrs_report_version'
);

select is(
  ((select updated_at from ggircs_portal.form_result where application_id=1 and version_number=0 and form_id=1) > now() - interval '12 hours'),
  true::boolean,
  'Application with id 1 was updated by the refresh function because because report.version !== application.swrs_report_version'
);

select is(
  (select swrs_report_version from ggircs_portal.application where id=1),
  (select version from swrs.report where swrs_report_id = (select swrs_report_id from ggircs_portal.application where id =1)),
  'The swrs_report_version was updated for application with id 1'
);

select is(
  (select facility_name from ggircs_portal.ciip_admin where application_id=1 and version_number=0),
  (select facility_name from ggircs_portal.get_swrs_facility_data(1, (select reporting_year from ggircs_portal.opened_reporting_year()))),
  'Refresh function added the correct facility data to the admin form for application with id = 1'
);

select is(
  (select operator_name from ggircs_portal.ciip_admin where application_id=1 and version_number=0),
  (select operator_name from ggircs_portal.get_swrs_organisation_data(1, (select reporting_year from ggircs_portal.opened_reporting_year()))),
  'Refresh function added the correct organisation data to the admin form for application with id = 1'
);

select is(
  (select operational_representative_last_name from ggircs_portal.ciip_admin where application_id=1 and version_number=0),
  (select last_name from ggircs_portal.get_swrs_operator_contact_data(1, (select reporting_year from ggircs_portal.opened_reporting_year()))),
  'Refresh function added the correct contact data to the admin form for application with id = 1'
);

select is(
  (select annual_emission from ggircs_portal.ciip_emission where application_id=1 and version_number=0 and annual_emission > 0 order by annual_emission desc limit 1),
  (select quantity from ggircs_portal.get_swrs_emission_data(1, (select reporting_year from ggircs_portal.opened_reporting_year())) order by quantity desc limit 1),
  'Refresh function added the correct data to the emission form for application with id = 1'
);

select is(
  (select quantity from ggircs_portal.ciip_fuel where application_id=1 and version_number=0 and quantity > 0 order by quantity desc limit 1),
  (select annual_fuel_amount from ggircs_portal.get_swrs_fuel_data(1, (select reporting_year from ggircs_portal.opened_reporting_year())) order by annual_fuel_amount desc limit 1),
  'Refresh function added the correct data to the fuel form for application with id = 1'
);

select is(
  (select form_result from ggircs_portal.form_result where application_id=1 and version_number=0 and form_id=4),
  '[]'::jsonb,
  'Refresh function did nothing to the production form for application 1'
);

select is(
  (select form_result from ggircs_portal.form_result where application_id=2 and version_number=0 and form_id=4),
  '[]'::jsonb,
  'Refresh function created the production form for application 2'
);

select finish();

rollback;
