set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'facility_application_application_status', array['ggircs_portal.facility_application'],
  'Function facility_application_application_status should exist'
);

select is(
  (
    select ggircs_portal.facility_application_application_status(
      (
        select row(facility_application_by_reporting_year.*)::ggircs_portal.facility_application
        from ggircs_portal.facility_application_by_reporting_year(2019)
        where facility_id = 2
      )
    )
  ),
  'draft',
  'facility_application_application_status returns the most recent status of an application.'
);

select is(
  (
    select ggircs_portal.facility_application_application_status(
      (
        select row(facility_application_by_reporting_year.*)::ggircs_portal.facility_application
        from ggircs_portal.facility_application_by_reporting_year(2019)
        where facility_id = 4
      )
    )
  ),
  null,
  'facility_application_application_status returns null if an application does not exist.'
);

select finish();

rollback;
