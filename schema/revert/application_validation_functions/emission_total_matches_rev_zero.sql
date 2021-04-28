-- Revert ggircs-portal:application_validation_functions/emission_total_matches_rev_zero from pg

begin;

drop function ggircs_portal.emission_total_matches_rev_zero;

commit;
