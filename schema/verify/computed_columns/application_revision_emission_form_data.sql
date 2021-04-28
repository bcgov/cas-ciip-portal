-- Verify ggircs-portal:computed_columns/application_revision_emission_form_data on pg

begin;

select pg_get_functiondef('ggircs_portal.application_revision_emission_form_data(ggircs_portal.application_revision)'::regprocedure);

rollback;
