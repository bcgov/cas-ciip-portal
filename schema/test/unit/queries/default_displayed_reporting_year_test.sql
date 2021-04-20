begin;
set client_min_messages to warning;
create extension if not exists pgtap;

select plan(2);

truncate table ggircs_portal.reporting_year restart identity cascade;

insert into ggircs_portal.reporting_year(reporting_year, reporting_period_start, reporting_period_end, swrs_deadline, application_open_time, application_close_time)
values
(2018, '2018-01-01 00:00:00.0-08', '2018-12-31 23:59:59.0-08', '2019-06-01 00:00:00.000000-07', '2019-04-01 00:00:00.000000-07', '2019-08-31 23:59:59.999999-07'),
(2019, '2019-01-01 00:00:00.0-08', '2019-12-31 23:59:59.0-08', '2020-07-31 00:00:00.000000-07', '2020-04-01 00:00:00.000000-07', '2020-08-31 23:59:59.999999-07'),
(2020, '2020-01-01 00:00:00.0-08', '2020-12-31 23:59:59.0-08', '2021-06-01 00:00:00.000000-07', '2021-04-01 00:00:00.000000-07', '2021-08-31 23:59:59.999999-07');

select set_config('search_path','mocks,pg_catalog,public', true);

select set_config(
  'mocks.mocked_timestamp',
  (select extract(epoch from ('2020-06-01'::timestamptz))::varchar),
  true
);
select is(
  (select reporting_year from ggircs_portal.default_displayed_reporting_year()),
  2019,
  'default_displayed_reporting_year returns the currently opened reporting year when the application window is open'
);

select set_config(
  'mocks.mocked_timestamp',
  (select extract(epoch from ('2020-03-01'::timestamptz))::varchar),
  true
);
select is(
  (select reporting_year from ggircs_portal.default_displayed_reporting_year()),
  2018,
  'default_displayed_reporting_year returns the previously opened reporting year when the application window is closed'
);


select finish();

rollback;
