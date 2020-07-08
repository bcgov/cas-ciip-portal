set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(3);

select has_function(
  'ggircs_portal', 'create_application_mutation_chain', array['integer'],
  'Function create_application_mutation_chain should exist'
);

alter table ggircs_portal.application_revision_status disable trigger _status_change_email;
alter table ggircs_portal.application
  disable trigger _send_draft_application_email;

truncate table ggircs_portal.organisation restart identity cascade;
insert into ggircs_portal.organisation(operator_name) values ('test org');
insert into ggircs_portal.facility(organisation_id, facility_name, report_id) values (1, 'test facility', 42);

-- Set the timestamp to a time where the application window is open
create or replace function ggircs_portal.current_timestamp() returns timestamptz as
$$
  select application_open_time
  from ggircs_portal.reporting_year
  order by reporting_year
  limit 1
  offset 2;
$$ language sql;

select ggircs_portal.create_application_mutation_chain((select id from ggircs_portal.facility where facility_name = 'test facility'));

select is(
  (select report_id from ggircs_portal.application where id = 1), 42::integer,
  'create_application_mutation_chain copies the report_id from the facility table to the application table'
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
  'select ggircs_portal.create_application_mutation_chain(1)',
  'The application window is closed',
  'create_application_mutation_chain should throw an exception if the application window is closed'
);

select finish();

rollback;
