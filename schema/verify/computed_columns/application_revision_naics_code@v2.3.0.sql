-- Verify ggircs-portal:computed_columns/application_revision_naics_code on pg

begin;

select pg_get_functiondef('ggircs_portal.application_revision_naics_code(ggircs_portal.application_revision)'::regprocedure);

rollback;
