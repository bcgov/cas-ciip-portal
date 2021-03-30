set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

create or replace function open_application_window() returns void as
$fun$
  -- 2020 open date
  select mocks.set_mocked_time_in_transaction('2021-04-01 14:49:54.191757-07'::timestamptz);
$fun$language sql;

create or replace function close_application_window() returns void as
$fun$
  -- Set the timestamp to a time where the application window is closed
  -- 2020 open date minus one second
  select mocks.set_mocked_time_in_transaction('2021-04-01 14:49:54.191757-07'::timestamptz - interval '1 second');
$fun$language sql;

select plan(9);

-- Setup
alter table ggircs_portal.application_revision_status disable trigger _status_change_email;
alter table ggircs_portal.application
  disable trigger _send_draft_application_email;

select open_application_window();

insert into ggircs_portal.organisation(operator_name) values ('test org');
insert into ggircs_portal.facility(organisation_id, facility_name) values (1, 'test facility');
truncate ggircs_portal.application_revision restart identity cascade;

select ggircs_portal.create_application_mutation_chain((select id from ggircs_portal.facility where facility_name = 'test facility'));

-- 2018 data test setup
-- insert into ggircs_portal.application(facility_id, reporting_year)
-- values ((select id from ggircs_portal.facility where facility_name = 'test facility'), 2018);

insert into ggircs_portal.form_json(
name,
slug,
short_name,
description,
form_json,
prepopulate_from_ciip,
prepopulate_from_swrs,
default_form_result
) values
('admin', 'admin-2018', 'admin', 'admin', '{}', false, false, '{}');

insert into ggircs_portal.ciip_application_wizard(form_id, form_position, is_active)
values ((select id from ggircs_portal.form_json order by id desc limit 1), 0, false);

select has_function(
  'ggircs_portal', 'create_application_revision_mutation_chain', array['integer', 'integer'],
  'Function create_application_revision_mutation_chain should exist'
);

select is_empty(
  $$
    select * from ggircs_portal.form_result where form_id=(select id from ggircs_portal.form_json order by id desc limit 1)
  $$,
  'ggircs_portal.create_application_revision_mutation_chain should ignore inactive form_jsons'
);

select results_eq(
  $$
    select facility_name from ggircs_portal.application_revision ar
    join ggircs_portal.application a on ar.application_id = a.id
    join ggircs_portal.facility f on a.facility_id = f.id
    and ar.application_id = (select max(application_id) from ggircs_portal.application_revision)
    order by ar.version_number
    desc
    limit 1
  $$,
  $$
  select facility_name from ggircs_portal.facility where facility_name = 'test facility'
  $$,
  'create_application_revision_mutation_chain is called by create_application_mutation_chain & creates a revision'
);

select results_eq(
  $$
    select application_revision_status from ggircs_portal.facility f
    join ggircs_portal.application a on f.id = a.facility_id
    join ggircs_portal.application_revision ar on a.id = ar.application_id
    join ggircs_portal.application_revision_status ars on ar.application_id = ars.application_id
    and ar.version_number = ars.version_number
    and f.facility_name = 'test facility'
    order by ars.version_number
    desc
    limit 1
  $$,
  ARRAY['draft'::ggircs_portal.ciip_application_revision_status],
  'create_application_revision_mutation_chain creates an inital draft status'
);

-- create an application with a facility that does not have a swrs report
insert into ggircs_portal.facility(organisation_id, facility_name) values (1, 'no swrs');
select ggircs_portal.create_application_mutation_chain((select id from ggircs_portal.facility where facility_name = 'no swrs'));

select results_eq(
  $$
    select version_number from ggircs_portal.facility f
    join ggircs_portal.application a on f.id = a.facility_id
    join ggircs_portal.application_revision ar on a.id = ar.application_id
    and f.facility_name = 'no swrs';
  $$,
  ARRAY[1::integer],
  'If an application has no swrs report, only one application revision with version_number 1 is created'
);

-- create an application with a facility that has a swrs report
insert into ggircs_portal.facility(organisation_id, facility_name, report_id) values (1, 'has swrs', 1);
select ggircs_portal.create_application_mutation_chain((select id from ggircs_portal.facility where facility_name = 'has swrs'));

select results_eq(
  $$
    select version_number from ggircs_portal.facility f
    join ggircs_portal.application a on f.id = a.facility_id
    join ggircs_portal.application_revision ar on a.id = ar.application_id
    and f.facility_name = 'has swrs'
    order by version_number;
  $$,
  ARRAY[0::integer, 1::integer],
  'If an application has a swrs report, two application revisions are created with version_number 0 for swrs and 1 for draft'
);

select results_eq(
  $$
    select application_revision_status from ggircs_portal.facility f
    join ggircs_portal.application a on f.id = a.facility_id
    join ggircs_portal.application_revision ar on a.id = ar.application_id
    join ggircs_portal.application_revision_status ars on ar.application_id = ars.application_id
    and f.facility_name = 'has swrs'
    order by ars.version_number
    asc limit 1;
  $$,
  ARRAY['submitted'::ggircs_portal.ciip_application_revision_status],
  'If an application has a swrs report, the version 0 swrs revision has a default status of SUBMITTED'
);

select open_application_window();

truncate ggircs_portal.application restart identity cascade;

insert into ggircs_portal.application(
  facility_id,
  reporting_year,
  report_id
)
values (
  (select id from ggircs_portal.facility where facility_name = 'test facility'),
  (select reporting_year from ggircs_portal.opened_reporting_year()),
  (select report_id from ggircs_portal.facility where facility_name = 'test facility')
);

select close_application_window();
select throws_ok(
  $$
    with app_id as (
    select a.id from ggircs_portal.application a
      join ggircs_portal.facility f on a.facility_id = f.id
      and facility_name = 'test facility'
    ) select ggircs_portal.create_application_revision_mutation_chain((select id from app_id), 0)
  $$,
  'The application window is closed',
  'create_application_mutation_chain should throw an exception if the application window is closed and the last version_number is 0'
);

select open_application_window();
with app_id as (
  select a.id from ggircs_portal.application a
    join ggircs_portal.facility f on a.facility_id = f.id
    and facility_name = 'test facility'
) select ggircs_portal.create_application_revision_mutation_chain((select id from app_id), 0);

select close_application_window();

select lives_ok(
  $$
    with app_id as (
    select a.id from ggircs_portal.application a
      join ggircs_portal.facility f on a.facility_id = f.id
      and facility_name = 'test facility'
    ) select ggircs_portal.create_application_revision_mutation_chain((select id from app_id), 1)
  $$,
  'create_application_mutation_chain should no throw an exception if the application window is closed and the last version_number is >= 1'
);

select finish();

rollback;
