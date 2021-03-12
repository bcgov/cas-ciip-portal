set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'facility_application_last_swrs_reporting_year', array['ggircs_portal.facility_application'],
  'Function facility_application_last_swrs_reporting_year should exist'
);

select is(
  (
    select ggircs_portal.facility_application_last_swrs_reporting_year(
      (
        select row(facility_application_by_reporting_year.*)::ggircs_portal.facility_application
        from ggircs_portal.facility_application_by_reporting_year(2019)
        where facility_id = 4
      )
    )
  ),
  2018,
  'facility_application_last_swrs_reporting_year returns the year of the most recent SWRS report for an application.'
);

select is(
  (
    select ggircs_portal.facility_application_last_swrs_reporting_year(
      (
        select row(facility_application_by_reporting_year.*)::ggircs_portal.facility_application
        from ggircs_portal.facility_application_by_reporting_year(2019)
        where facility_id = 10 -- dev data has 9 facilities inserted from swrs reports
      )
    )
  ),
  null,
  'facility_application_last_swrs_reporting_year returns null if a facility does not have any swrs report.'
);

select finish();

rollback;
