-- Verify ggircs-portal:computed_columns/application_revision_carbon_tax on pg

begin;

select pg_get_functiondef('ggircs_portal.application_revision_carbon_tax(ggircs_portal.application_revision)'::regprocedure);

rollback;
