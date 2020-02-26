set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(2);

select has_function(
  'ggircs_portal', 'create_application_mutation_chain', array['integer'],
  'Function create_application_mutation_chain should exist'
);

alter table ggircs_portal.application_revision_status disable trigger _status_change_email;

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
