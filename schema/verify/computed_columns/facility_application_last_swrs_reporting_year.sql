-- Verify ggircs-portal:computed_columns/facility_application_last_swrs_reporting_year on pg

begin;

select pg_get_functiondef('ggircs_portal.facility_application_last_swrs_reporting_year(ggircs_portal.facility_application)'::regprocedure);

rollback;
