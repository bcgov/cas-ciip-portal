-- Verify ggircs-portal:computed_columns/application_revision_is_current_version on pg

begin;

select pg_get_functiondef('ggircs_portal.application_revision_is_current_version(ggircs_portal.application_revision)'::regprocedure);

rollback;
