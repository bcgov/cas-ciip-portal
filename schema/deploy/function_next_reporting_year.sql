-- Deploy ggircs-portal:next_reporting_year to pg

begin;

create or replace function ggircs_portal.next_reporting_year()
returns ggircs_portal.reporting_year
as $function$
declare
begin
    return(
      select row (_reporting_year.*)
      from ggircs_portal.reporting_year as _reporting_year
      where ggircs_portal.current_date() <= application_open_date
      order by reporting_year
      limit 1
    );
    end;
$function$ language plpgsql stable;

comment on function ggircs_portal.next_reporting_year is 'Returns the next reporting year to have an application window that opens.
To get the currently opened reporting year (if any), use opened_reporting_year';

commit;
