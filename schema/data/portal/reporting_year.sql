begin;

with rows as (
insert into ggircs_portal.reporting_year(reporting_year, reporting_period_start, reporting_period_end, application_open_date, application_end_date, application_response_date)
overriding system value
values
(2018, '2017-01-01 14:49:54.191757-07', '2018-12-30 14:49:54.191757-07', '2018-04-01 14:49:54.191757-07', '2018-12-30 14:49:54.191757-07', '2019-01-30 14:49:54.191757-07'),
(2019, '2018-01-01 14:49:54.191757-07', '2018-12-30 14:49:54.191757-07', '2019-04-01 14:49:54.191757-07', '2019-12-30 14:49:54.191757-07', '2020-01-30 14:49:54.191757-07')
on conflict(reporting_year) do update set
reporting_period_start=excluded.reporting_period_start,
reporting_period_end=excluded.reporting_period_end,
application_open_date=excluded.application_open_date,
application_end_date=excluded.application_end_date,
application_response_date=excluded.application_response_date
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.reporting_year' from rows;

commit;
