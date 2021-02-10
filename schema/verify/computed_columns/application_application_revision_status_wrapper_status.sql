-- Verify ggircs-portal:computed_columns/application_application_revision_status_wrapper_status on pg

begin;

select pg_get_functiondef('ggircs_portal.application_application_revision_status_wrapper_status(ggircs_portal.application)'::regprocedure);

rollback;
