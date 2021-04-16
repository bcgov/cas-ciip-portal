-- Verify ggircs-portal:queries/facility_application_by_reporting_year on pg

begin;

select pg_get_functiondef('ggircs_portal.facility_application_by_reporting_year(int)'::regprocedure);

rollback;
