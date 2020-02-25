-- Verify ggircs-portal:computed_columns/application_revision_certification_url on pg

begin;

select pg_get_functiondef('ggircs_portal.application_revision_certification_url(ggircs_portal.application_revision)'::regprocedure);

rollback;
