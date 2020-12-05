-- Deploy ggircs-portal:opened_reporting_year to pg

begin;

create or replace function ggircs_portal.opened_reporting_year()
returns ggircs_portal.reporting_year
as $function$
  select *
  from ggircs_portal.reporting_year as _reporting_year
  where now() between application_open_time and application_close_time;
$function$ language sql stable;

grant execute on function ggircs_portal.opened_reporting_year to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

comment on function ggircs_portal.opened_reporting_year is 'Returns the reporting year for which the application window is currently opened (if any)';

commit;
