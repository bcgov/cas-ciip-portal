
begin;

-- Set the timestamp to a time where the application window is open
create or replace function ggircs_portal.current_timestamp() returns timestamptz as
$$
  select application_open_time
  from ggircs_portal.reporting_year
  where reporting_year = 2019
$$ language sql;

commit;
