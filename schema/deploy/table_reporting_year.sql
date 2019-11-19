-- Deploy ggircs-portal:table_reporting_year to pg
-- requires: schema_ggircs_portal

begin;

create table ggircs_portal.reporting_year (
    reporting_year integer primary key,
    reporting_period_start timestamp with time zone,
    reporting_period_end timestamp with time zone,
    application_open_date timestamp with time zone,
    application_end_date timestamp with time zone,
    application_response_date timestamp with time zone
);

commit;
