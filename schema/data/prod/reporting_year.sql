begin;

with rows as (
insert into ggircs_portal.reporting_year(reporting_year, reporting_period_start, reporting_period_end, swrs_deadline, application_open_time, application_close_time, application_response_time)
overriding system value
values
(2018, '2018-01-01 00:00:00.0-08', '2018-12-31 23:59:59.0-08', '2019-06-01 00:00:00.000000-07', '2019-04-01 14:49:54.191757-07', '2019-12-30 14:49:54.191757-08', '2020-01-30 14:49:54.191757-08'),
(2019, '2019-01-01 00:00:00.0-08', '2019-12-31 23:59:59.0-08', '2020-07-31 00:00:00.000000-07', '2020-07-03 00:00:00.000000-07', '2020-08-31 23:59:59.999999-07', '2021-01-30 14:49:54.191757-08'),
(2020, '2020-01-01 00:00:00.0-08', '2020-12-31 23:59:59.0-08', '2021-06-01 00:00:00.000000-07', '2021-04-01 14:49:54.191757-07', '2021-12-30 14:49:54.191757-08', '2022-01-30 14:49:54.191757-08'),
(2021, '2021-01-01 00:00:00.0-08', '2021-12-31 23:59:59.0-08', '2022-06-01 00:00:00.000000-07', '2022-04-01 14:49:54.191757-07', '2022-12-30 14:49:54.191757-08', '2023-01-30 14:49:54.191757-08'),
(2022, '2022-01-01 00:00:00.0-08', '2022-12-31 23:59:59.0-08', '2023-06-01 00:00:00.000000-07', '2023-04-01 14:49:54.191757-07', '2023-12-30 14:49:54.191757-08', '2024-01-30 14:49:54.191757-08')

on conflict(reporting_year) do update set
reporting_period_start=excluded.reporting_period_start,
reporting_period_end=excluded.reporting_period_end,
application_open_time=excluded.application_open_time,
application_close_time=excluded.application_close_time,
application_response_time=excluded.application_response_time
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.reporting_year' from rows;

commit;
