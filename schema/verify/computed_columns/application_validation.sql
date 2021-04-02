-- Verify ggircs-portal:computed_columns/application_validation on pg

begin;

select pg_get_functiondef('ggircs_portal.application_validation(ggircs_portal.application)'::regprocedure);

rollback;
