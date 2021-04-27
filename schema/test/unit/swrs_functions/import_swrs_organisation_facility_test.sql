set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select plan(10);

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

select set_eq(
  $$
    with facility_latest_report as (
      select max(r.reporting_period_duration) as reporting_period_duration, r.swrs_facility_id
      from swrs.report r join swrs.facility f on r.id = f.report_id group by r.swrs_facility_id
    )
    select facility_bc_ghg_id
    from swrs.facility f
    join swrs.report r on r.id = f.report_id
    join facility_latest_report flr on flr.swrs_facility_id = r.swrs_facility_id
      and flr.reporting_period_duration = r.reporting_period_duration;
  $$,
  'select bcghgid from ggircs_portal.facility',
  'The import function imports the bc ghg id from the latest report of each facility');

set client_min_messages to warning;
truncate table ggircs_portal.organisation restart identity cascade;
truncate table swrs.report restart identity cascade;
reset client_min_messages;

-- Create a dataset that has one organisation with two facilities in the same reporting year
insert into swrs.report(id, swrs_report_id, reporting_period_duration, swrs_organisation_id, swrs_facility_id)
values (1, 1, '2018', 42, 1234), (2, 2, '2018', 42, 1235), (3, 3, '2018', 42, 1236);

-- In swrs, an there is one organisation entry per report (i.e. per facility)
-- Even if those organisations have the same swrs_organisation_id (and are the same entity)
insert into swrs.organisation(id, report_id, swrs_organisation_id)
values (1, 1, 42), (2, 2, 42), (3, 3, 42);

insert into swrs.facility(id, report_id, organisation_id, swrs_facility_id, facility_type)
values (1, 1, 1, 1234, 'LFO'), (2, 2, 2, 1235, 'If_a'), (3, 3, 3, 1236, 'If_b');

select ggircs_portal.import_swrs_organisation_facility();

select is(
  (select count(*) from ggircs_portal.organisation)::integer,
  1,
  'The import function only inserts a single organisation record if an organisation has multiple facilties');



select is(
  (select count(*) from ggircs_portal.facility)::integer,
  2,
  'The import function imports all non-LFO facilites belonging to the same organisation');


select finish();

rollback;
