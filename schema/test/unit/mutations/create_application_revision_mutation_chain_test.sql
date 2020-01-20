set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(6);

select has_function(
  'ggircs_portal', 'create_application_revision_mutation_chain', array['integer', 'integer'],
  'Function create_application_revision_mutation_chain should exist'
);

-- Set the timestamp to a time where the application window is open
create or replace function ggircs_portal.current_timestamp() returns timestamptz as
$$
  select application_open_time
  from ggircs_portal.reporting_year
  order by reporting_year
  limit 1
  offset 2;
$$ language sql;

insert into ggircs_portal.organisation(operator_name) values ('test org');
insert into ggircs_portal.facility(organisation_id, facility_name) values (1, 'test facility');

select ggircs_portal.create_application_mutation_chain((select id from ggircs_portal.facility where facility_name = 'test facility'));

select results_eq(
  $$
    select facility_name from ggircs_portal.application_revision ar
    join ggircs_portal.application a on ar.application_id = a.id
    join ggircs_portal.facility f on a.facility_id = f.id
    and ar.application_id = (select max(application_id) from ggircs_portal.application_revision)
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
  $$,
  ARRAY['draft'::ggircs_portal.ciip_application_revision_status],
  'create_application_revision_mutation_chain creates an inital draft status'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.form_result_status frs
    join ggircs_portal.application a on a.id = frs.application_id
    join ggircs_portal.facility f on a.facility_id = f.id
    and facility_name = 'test facility'
  $$,
  $$
    select count(form_id) from ggircs_portal.ciip_application_wizard
  $$,
  'create_application_revision_mutation_chain creates statuses for each form result when being called from create_application_mutation_chain (starting an application)'
);

with app_id as (
  select a.id from ggircs_portal.application a
    join ggircs_portal.facility f on a.facility_id = f.id
    and facility_name = 'test facility'
) select ggircs_portal.create_application_revision_mutation_chain((select id from app_id), 1);

select results_eq(
  $$
    select count(*) from ggircs_portal.form_result_status frs
    join ggircs_portal.application a on a.id = frs.application_id
    join ggircs_portal.facility f on a.facility_id = f.id
    and facility_name = 'test facility'
  $$,
  $$
    select count(form_id) from ggircs_portal.ciip_application_wizard
  $$,
  'create_application_revision_mutation_chain does not create extra statuses for each form result when being called on its own (creating a revision)'
);

-- Set the timestamp to a time where the application window is closed
create or replace function ggircs_portal.current_timestamp() returns timestamptz as
$$
  select application_open_time - interval '1 second'
  from ggircs_portal.reporting_year
  order by reporting_year
  limit 1
  offset 2;
$$ language sql;

select throws_ok(
  $$
    with app_id as (
    select a.id from ggircs_portal.application a
      join ggircs_portal.facility f on a.facility_id = f.id
      and facility_name = 'test facility'
    ) select ggircs_portal.create_application_revision_mutation_chain((select id from app_id), (select max(version_number) from ggircs_portal.application_revision where application_id = (select id from app_id)))
  $$,
  'The application window is closed',
  'create_application_mutation_chain should throw an exception if the application window is closed'
);

select finish();

rollback;
