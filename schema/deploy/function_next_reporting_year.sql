-- Deploy ggircs-portal:next_reporting_year to pg

begin;

create or replace function ggircs_portal.next_reporting_year()
returns ggircs_portal.reporting_year
as $function$
  select *
  from ggircs_portal.reporting_year as _reporting_year
  where now() < application_open_time
  order by reporting_year
  limit 1;
$function$ language sql stable;

grant execute on function ggircs_portal.next_reporting_year to ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest;

comment on function ggircs_portal.next_reporting_year is 'Returns the next reporting year to have an application window that opens.
To get the currently opened reporting year (if any), use opened_reporting_year';

commit;
