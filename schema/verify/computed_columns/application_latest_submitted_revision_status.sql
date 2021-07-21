-- Verify ggircs-portal:computed_columns/application_latest_submitted_revision_status on pg

begin;

select pg_get_functiondef('ggircs_portal.application_latest_submitted_revision_status(ggircs_portal.application)'::regprocedure);

rollback;
