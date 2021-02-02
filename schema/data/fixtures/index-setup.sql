

begin;


insert into ggircs_portal.reporting_year(reporting_year, reporting_period_start, reporting_period_end, swrs_deadline, application_open_time, application_close_time)
  overriding system value
  values(
    2019,
    '2019-01-01 00:00:00.0-08',
    '2019-12-31 23:59:59.0-08',
    '2019-07-31 00:00:00.000000-07',
    ('1991-01-23 11:11:00.000000-07'),
    ('2999-12-31 00:00:00.000000-07')
  ) on conflict(reporting_year) do update set
    reporting_period_start=excluded.reporting_period_start,
    reporting_period_end=excluded.reporting_period_end,
    swrs_deadline=excluded.swrs_deadline,
    application_open_time=excluded.application_open_time,
    application_close_time=excluded.application_close_time
  ;


commit;
