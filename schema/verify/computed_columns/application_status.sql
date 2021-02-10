-- Verify ggircs-portal:computed_columns/application_status on pg

begin;

select pg_get_functiondef('ggircs_portal.application_status(ggircs_portal.application)'::regprocedure);

rollback;
