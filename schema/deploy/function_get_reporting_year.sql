-- Deploy ggircs-portal:function_get_reporting_year to pg
-- requires: table_reporting_year

begin;

create or replace function ggircs_portal.get_reporting_year()
    returns ggircs_portal.reporting_year
    as $function$

            select *
            from ggircs_portal.reporting_year
            where (select CURRENT_TIMESTAMP) between reporting_period_start::timestamp with time zone and reporting_period_end::timestamp with time zone

    $function$
        language sql stable;

commit;
