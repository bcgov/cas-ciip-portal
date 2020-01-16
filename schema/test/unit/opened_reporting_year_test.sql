set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;


select plan(4);

select has_function(
  'ggircs_portal', 'opened_reporting_year',
  'Function opened_reporting_year should exist'
);

create or replace function ggircs_portal.current_timestamp() returns timestamptz as
$$
  select application_open_time
  from ggircs_portal.reporting_year
  order by reporting_year
  limit 1
  offset 2;
$$ language sql;

select results_eq(
  'select * from ggircs_portal.opened_reporting_year()',
  'select * from ggircs_portal.reporting_year order by reporting_year limit 1 offset 2',
  'The opened_reporting_year function returns the correct reporting year if the window is opened'
);

create or replace function ggircs_portal.current_timestamp() returns timestamptz as
$$
  select application_open_time - interval '1 second'
  from ggircs_portal.reporting_year
  order by reporting_year
  limit 1
  offset 2;
$$ language sql;

select is(
  (select reporting_year from ggircs_portal.opened_reporting_year()), null,
  'The opened_reporting_year function returns a null reporting year if the application is not opened yet'
);

create or replace function ggircs_portal.current_timestamp() returns timestamptz as
$$
  select application_close_time + interval '1 second'
  from ggircs_portal.reporting_year
  order by reporting_year
  limit 1
  offset 2;
$$ language sql;

select is(
  (select reporting_year from ggircs_portal.opened_reporting_year()), null,
  'The opened_reporting_year function returns a null reporting year if the application is not opened anymore'
);

select finish();

rollback;
