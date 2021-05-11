-- Verify ggircs-portal:application_validation_functions/carbon_taxed_fuels_match_rev_zero on pg

begin;

select pg_get_functiondef('ggircs_portal.carbon_taxed_fuels_match_rev_zero(ggircs_portal.application_revision)'::regprocedure);

rollback;
