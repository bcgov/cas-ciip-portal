-- Verify ggircs-portal:computed_columns/application_facility on pg

begin;

select pg_get_functiondef('ggircs_portal.application_facility(ggircs_portal.application)'::regprocedure);

rollback;
