-- Verify ggircs-portal:function_facility_has_swrs_report on pg

begin;

select pg_get_functiondef('ggircs_portal.facility_has_swrs_report(ggircs_portal.facility, integer)'::regprocedure);

rollback;
