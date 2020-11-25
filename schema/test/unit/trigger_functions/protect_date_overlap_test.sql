set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(7);

select has_function(
  'ggircs_portal_private', 'protect_date_overlap',
  'Function protect_date_overlap should exist'
);

select lives_ok(
  $$
  insert into ggircs_portal.reporting_year (reporting_year, reporting_period_start, reporting_period_end, swrs_deadline, application_open_time, application_close_time) overriding system value
  values (3000, '3000-01-01 00:00:00-08', '3000-12-31 23:59:59-08', '3001-06-01 00:00:00-07', '3001-04-01 14:49:54.191757-07', '3001-12-31 14:49:54.191757-08')
  $$,
  'trigger does not throw when no dates overlap with existing rows'
);

select throws_like(
  $$
  insert into ggircs_portal.reporting_year (reporting_year, reporting_period_start, reporting_period_end, swrs_deadline, application_open_time, application_close_time) overriding system value
  values (3001, '3000-12-30 00:00:00-08', '3001-12-31 23:59:59-08', '3002-06-01 00:00:00-07', '3002-04-01 14:49:54.191757-07', '3002-12-30 14:49:54.191757-08')
  $$,
  'New date range entry overlaps%',
  'Throws when application_start_date falls within another range'
);

select throws_like(
  $$
  insert into ggircs_portal.reporting_year (reporting_year, reporting_period_start, reporting_period_end, swrs_deadline, application_open_time, application_close_time) overriding system value
  values (3001, '3001-01-01 00:00:00-08', '3000-12-30 23:59:59-08', '3002-06-01 00:00:00-07', '3002-04-01 14:49:54.191757-07', '3002-12-30 14:49:54.191757-08')
  $$,
  'New date range entry overlaps%',
  'Throws when application_end_date falls within another range'
);

select throws_like(
  $$
  insert into ggircs_portal.reporting_year (reporting_year, reporting_period_start, reporting_period_end, swrs_deadline, application_open_time, application_close_time) overriding system value
  values (3001, '3001-01-01 00:00:00-08', '3001-12-30 23:59:59-08', '3002-06-01 00:00:00-07', '3001-04-02 14:49:54.191757-07', '3002-12-30 14:49:54.191757-08')
  $$,
  'New date range entry overlaps%',
  'Throws when application_open_time falls within another range'
);

select throws_like(
  $$
  insert into ggircs_portal.reporting_year (reporting_year, reporting_period_start, reporting_period_end, swrs_deadline, application_open_time, application_close_time) overriding system value
  values (3001, '3001-01-01 00:00:00-08', '3001-12-30 23:59:59-08', '3002-06-01 00:00:00-07', '3002-04-01 14:49:54.191757-07', '3001-12-29 14:49:54.191757-08')
  $$,
  'New date range entry overlaps%',
  'Throws when application_close_time falls within another range'
);

-- Create new valid entry
insert into ggircs_portal.reporting_year (reporting_year, reporting_period_start, reporting_period_end, swrs_deadline, application_open_time, application_close_time) overriding system value
  values (3001, '3001-01-01 00:00:00-08', '3001-12-30 23:59:59-08', '3002-06-01 00:00:00-07', '3002-04-01 14:49:54.191757-07', '3002-12-31 14:49:54.191757-08');

select throws_like(
  $$
    update ggircs_portal.reporting_year set reporting_period_start='3000-01-02 00:00:00-08' where reporting_year=3001;
  $$,
  'New date range entry overlaps%',
  'Trigger throws on update operation'
);

select finish();

rollback;
