-- Deploy ggircs-portal:opened_reporting_year to pg

begin;

create or replace function ggircs_portal.opened_reporting_year()
returns ggircs_portal.reporting_year
as $function$
declare
begin
    return(
      select row (_reporting_year.*)
      from ggircs_portal.reporting_year as _reporting_year
      where ggircs_portal.current_date() >= application_open_date
      and ggircs_portal.current_date() <= application_close_date
    );
    end;
$function$ language plpgsql stable;

comment on function ggircs_portal.opened_reporting_year is 'Returns the reporting year for which the application window is currently opened (if any)';

commit;
