-- Verify ggircs-portal:computed_columns/application_revision_is_immutable on pg

begin;

select pg_get_functiondef('ggircs_portal.application_revision_is_immutable(ggircs_portal.application_revision)'::regprocedure);

rollback;
