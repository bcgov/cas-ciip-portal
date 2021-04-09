-- Verify ggircs-portal:computed_columns/application_revision_validation on pg

begin;

select pg_get_functiondef('ggircs_portal.application_revision_validation(ggircs_portal.application_revision)'::regprocedure);

rollback;
