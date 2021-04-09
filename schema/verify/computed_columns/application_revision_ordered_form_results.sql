-- Verify ggircs-portal:computed_columns/application_revision_ordered_form_results on pg

begin;

select pg_get_functiondef('ggircs_portal.application_revision_ordered_form_results(ggircs_portal.application_revision)'::regprocedure);

rollback;
