set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(2);

select has_function(
  'ggircs_portal', 'facility_application_by_reporting_year', array['int'],
  'Function facility_application_by_reporting_year should exist'
);

set jwt.claims.sub to '00000000-0000-0000-0000-000000000000';

select is(
  (select count(*) from ggircs_portal.facility_application_by_reporting_year(2019)),
  (select count(*) from ggircs_portal.facility
    left join ggircs_portal.application on application.id = facility.id and application.reporting_year = 2019),
  'The search_all_facilities function should return a left join between the facilities and their applications for a given reporting period');

select finish();

rollback;
