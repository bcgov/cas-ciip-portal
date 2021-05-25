-- Revert ggircs-portal:application_validation_functions/carbon_taxed_fuels_match_rev_zero from pg

begin;

drop function ggircs_portal.carbon_taxed_fuels_match_rev_zero;

commit;
