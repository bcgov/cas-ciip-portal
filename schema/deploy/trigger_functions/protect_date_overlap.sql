-- Deploy ggircs-portal:trigger_functions/protect_date_overlap to pg
-- requires: schema_ggircs_portal_private

begin;
  create or replace function ggircs_portal_private.protect_date_overlap()
    returns trigger as $$
  declare
    temp_row record;

  begin

    for temp_row in
      select * from ggircs_portal.reporting_year
    loop
      if (new.reporting_year != temp_row.reporting_year) then
        if ((new.reporting_period_start between temp_row.reporting_period_start and temp_row.reporting_period_end)
        or (new.reporting_period_end between temp_row.reporting_period_start and temp_row.reporting_period_end)
        or (new.application_open_time between temp_row.application_open_time and temp_row.application_close_time)
        or (new.application_close_time between temp_row.application_open_time and temp_row.application_close_time)) then
          raise exception 'New date range entry overlaps with date range for reporting year %', temp_row.reporting_year;
        end if;
      end if;
    end loop;

    return new;
  end;
  $$ language plpgsql volatile;

comment on function ggircs_portal_private.protect_date_overlap is 'Trigger function excepts if a date range in reporting_year overlaps with another row';

commit;
