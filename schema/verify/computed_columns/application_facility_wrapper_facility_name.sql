-- Verify ggircs-portal:computed_columns/application_facility_wrapper_facility_name on pg

begin;

select pg_get_functiondef('ggircs_portal.application_facility_wrapper_facility_name(ggircs_portal.application)'::regprocedure);

rollback;
