-- Verify ggircs-portal:computed_columns/facility_application_has_swrs_report on pg

begin;

select pg_get_functiondef('ggircs_portal.facility_application_has_swrs_report(ggircs_portal.facility_application)'::regprocedure);

rollback;
