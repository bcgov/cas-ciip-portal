-- Deploy ggircs-portal:function_get_reporting_year to pg
-- requires: table_reporting_year

begin;

create or replace function ggircs_portal.get_reporting_year()
    returns ggircs_portal.reporting_year
    as $function$
    declare
    begin
        return(
            select row (_reporting_year.*)
            from ggircs_portal.reporting_year as _reporting_year
            where (date_part('year', CURRENT_DATE)) = reporting_year
            );
        end;
    $function$
        language plpgsql stable;

comment on function ggircs_portal.get_reporting_year is 'Function returning current reporting year and related dates';

commit;
