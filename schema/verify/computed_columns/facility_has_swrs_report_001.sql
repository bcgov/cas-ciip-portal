-- Verify ggircs-portal:computed_columns/facility_has_swrs_report_001 on pg

begin;

select pg_get_functiondef('ggircs_portal.facility_has_swrs_report(ggircs_portal.facility)'::regprocedure);

rollback;
