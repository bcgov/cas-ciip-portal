set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(9);

select has_function(
  'ggircs_portal', 'import_swrs_organisation_facility',
  'Function import_swrs_organisation_facility should exist'
);

set client_min_messages to warning;
truncate table ggircs_portal.organisation restart identity cascade;
reset client_min_messages;

-- Uses the data imported with import-test-data
select ggircs_portal.import_swrs_organisation_facility();

select isnt((select count(*) from ggircs_portal.organisation)::integer, 0);
select isnt((select count(*) from ggircs_portal.facility)::integer, 0);

select is(
  (select count(distinct(swrs_organisation_id)) from swrs.organisation),
  (select count(*) from ggircs_portal.organisation),
  'The import function imports as many organisations as there are distinct swrs_organisation_id in swrs');

select set_eq(
  'select swrs_organisation_id from swrs.organisation',
  'select swrs_organisation_id from ggircs_portal.organisation',
  'The import function imports every swrs_organisation_id');

select is(
  (select count(distinct(swrs_facility_id)) from swrs.facility),
  (select count(*) from ggircs_portal.facility),
  'The import function imports as many facilities as there are distinct swrs_facility_id in swrs');

select set_eq(
  'select swrs_facility_id from swrs.facility',
  'select swrs_facility_id from ggircs_portal.facility',
  'The import function imports every swrs_facility_id');

set client_min_messages to warning;
truncate table ggircs_portal.organisation restart identity cascade;
truncate table swrs.report restart identity cascade;
reset client_min_messages;

-- Create a dataset that has one organisation with two facilities in the same reporting year
insert into swrs.report(id, swrs_report_id, reporting_period_duration, swrs_organisation_id, swrs_facility_id)
values (1, 1, '2018', 1, 1), (2, 2, '2018', 1, 2);

-- In swrs, an there is one organisation entry per report (i.e. per facility)
-- Even if those organisations have the same swrs_organisation_id (and are the same entity)
insert into swrs.organisation(id, report_id, swrs_organisation_id)
values (1, 1, 1), (2, 2, 1);

insert into swrs.facility(id, report_id, organisation_id, swrs_facility_id)
values (1, 1, 1, 1), (2, 2, 2, 2);

select ggircs_portal.import_swrs_organisation_facility();

select is(
  (select count(*) from ggircs_portal.organisation)::integer,
  1,
  'The import function only inserts a single organisation record if an organisation has multiple facilties');

select is(
  (select count(*) from ggircs_portal.facility)::integer,
  2,
  'The import function imports both facilites belonging to the same organisation');


select finish();

rollback;
