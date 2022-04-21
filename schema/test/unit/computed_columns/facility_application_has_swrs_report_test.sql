set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(5);

-- Clean schema
select test_helper.clean_ggircs_portal_schema();
alter table ggircs_portal.ciip_user disable trigger _welcome_email;
select test_helper.create_test_users();
select test_helper.mock_open_window();
-- Create facilities / applications
select test_helper.create_applications(2, True, True);
-- Set the reporting year to 2019
update ggircs_portal.application set reporting_year=2019;
-- Set the swrs_facility_id for each facility
update ggircs_portal.facility set swrs_facility_id = 1 where id = 1;
update ggircs_portal.facility set swrs_facility_id = 2 where id = 2;

-- Clean the report table & add a report for the facility with swrs_facility_id = 1
truncate swrs.report restart identity cascade;
insert into swrs.report(id, reporting_period_duration, swrs_facility_id, swrs_report_id)
  values(1, 2019, 1, 1);

select has_function(
  'ggircs_portal', 'facility_application_has_swrs_report', array['ggircs_portal.facility_application'],
  'Function facility_application_has_swrs_report should exist'
);

select is(
  (
    select ggircs_portal.facility_application_has_swrs_report(
      (
        select row(facility_application_by_reporting_year.*)::ggircs_portal.facility_application
        from ggircs_portal.facility_application_by_reporting_year(2019)
        where facility_id = 1
      )
    )
  ),
  true,
  'Function returns true when a swrs report exists.'
);

select is(
  (
    select ggircs_portal.facility_application_has_swrs_report(
      (
        select row(facility_application_by_reporting_year.*)::ggircs_portal.facility_application
        from ggircs_portal.facility_application_by_reporting_year(2019)
        where facility_id = 2
      )
    )
  ),
  false,
  'Function returns false when a swrs report does not exist.'
);

-- Function should still work when no application has been started
truncate ggircs_portal.application restart identity cascade;

select is(
  (
    select ggircs_portal.facility_application_has_swrs_report(
      (
        select row(facility_application_by_reporting_year.*)::ggircs_portal.facility_application
        from ggircs_portal.facility_application_by_reporting_year(2019)
        where facility_id = 1
      )
    )
  ),
  true,
  'Function returns true when a swrs report exists and no application has been started.'
);

select is(
  (
    select ggircs_portal.facility_application_has_swrs_report(
      (
        select row(facility_application_by_reporting_year.*)::ggircs_portal.facility_application
        from ggircs_portal.facility_application_by_reporting_year(2019)
        where facility_id = 2
      )
    )
  ),
  false,
  'Function returns false when a swrs report does not exist and no application has been started.'
);

select finish();

rollback;
