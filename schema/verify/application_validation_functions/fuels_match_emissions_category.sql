-- Verify ggircs-portal:application_validation_functions/fuels_match_emissions_category on pg

begin;

select pg_get_functiondef('ggircs_portal.fuels_match_emissions_category(ggircs_portal.application_revision)'::regprocedure);

rollback;
