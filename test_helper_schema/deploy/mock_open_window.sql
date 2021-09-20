-- Deploy test_helpers:mock_open_window to pg
-- requires: schema_test_helper

begin;

create or replace function test_helper.mock_open_window(opened_reporting_year int default 2019)
returns void as
$function$
begin

  -- Mock the opened_reporting_year() function to always return the row for the input year (mocked below to always be open)
  execute 'create or replace function ggircs_portal.opened_reporting_year()
  returns ggircs_portal.reporting_year as
  $$
      select *
      from ggircs_portal.reporting_year
      where reporting_year=' || opened_reporting_year::text || '
  $$ language sql stable;';

  /**
    We "park" the application open and close times 100 years back to avoid conflicts with now()
    Using the reporting year itself as source makes sure we don't generate overlapping ranges in
    the past if this function gets executed multiple times
  **/
  update ggircs_portal.reporting_year
  set
  application_open_time = ((reporting_year - 100) || '-01-01 00:00:00.000000-07')::timestamptz,
  application_close_time= ((reporting_year - 100) || '-12-12 00:00:00.000000-07')::timestamptz
  where
  now() - interval '1 day' between application_open_time and application_close_time
  or
  now() + interval '1 day' between application_open_time and application_close_time;

  -- Upserts a row for the year where current date is always open
  insert into ggircs_portal.reporting_year(reporting_year, reporting_period_start, reporting_period_end, swrs_deadline, application_open_time, application_close_time)
  overriding system value
  values(
    opened_reporting_year,
    (opened_reporting_year::text || '-01-01 00:00:00.0-08')::timestamptz,
    (opened_reporting_year::text || '-12-31 23:59:59.0-08')::timestamptz,
    (opened_reporting_year::text || '-07-31 00:00:00.000000-07')::timestamptz,
    (select now() - interval '1 day'),
    (select now() + interval '1 day')
  ) on conflict(reporting_year) do update set
    reporting_period_start=excluded.reporting_period_start,
    reporting_period_end=excluded.reporting_period_end,
    swrs_deadline=excluded.swrs_deadline,
    application_open_time=excluded.application_open_time,
    application_close_time=excluded.application_close_time
  ;

end;
$function$ language plpgsql volatile;

commit;
