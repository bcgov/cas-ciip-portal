-- Deploy test_helpers:mock_open_window to pg
-- requires: schema_test_helper

begin;

create or replace function test_helper.mock_open_window()
returns void as
$function$

  -- Mock the opened_reporting_year() function to always return the row for 2019 (mocked below to always be open)
  create or replace function ggircs_portal.opened_reporting_year()
  returns ggircs_portal.reporting_year as
  $$
    select *
    from ggircs_portal.reporting_year
    where reporting_year = 2019
  $$ language sql stable;

  /**
    Mocking the open/close date for applications to now() +/- interval '1 day' can cause conflicts as these dates cannot overlap with other rows.
    This update statement fixes the overlap issue if it exists.
  **/
  update ggircs_portal.reporting_year
  set
  application_open_time = '2010-01-01 00:00:00.000000-07',
  application_close_time= '2010-12-12 00:00:00.000000-07'
  where
  now() - interval '1 day' between application_open_time and application_close_time
  or
  now() + interval '1 day' between application_open_time and application_close_time;

  -- Upserts a row for the 2019 year where current date is always open
  insert into ggircs_portal.reporting_year(reporting_year, reporting_period_start, reporting_period_end, swrs_deadline, application_open_time, application_close_time)
  overriding system value
  values(
    2019,
    '2019-01-01 00:00:00.0-08',
    '2019-12-31 23:59:59.0-08',
    '2019-07-31 00:00:00.000000-07',
    (select now() - interval '1 day'),
    (select now() + interval '1 day')
  ) on conflict(reporting_year) do update set
    reporting_period_start=excluded.reporting_period_start,
    reporting_period_end=excluded.reporting_period_end,
    swrs_deadline=excluded.swrs_deadline,
    application_open_time=excluded.application_open_time,
    application_close_time=excluded.application_close_time
  ;

$function$ language sql;

commit;
