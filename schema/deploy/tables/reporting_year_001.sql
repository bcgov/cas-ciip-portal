-- Deploy ggircs-portal:tables/reporting_year_001 to pg
-- requires: tables/reporting_year
-- requires: trigger_functions/protect_date_overlap

begin;

create trigger _protect_date_overlap
  before insert or update of
    reporting_period_start,
    reporting_period_end,
    application_open_time,
    application_close_time
  on ggircs_portal.reporting_year
  for each row
  execute procedure ggircs_portal_private.protect_date_overlap();

commit;
