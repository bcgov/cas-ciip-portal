-- Revert ggircs-portal:application_validation_functions/emission_total_matches_rev_zero from pg

begin;

delete from ggircs_portal.application_revision_validation_function where validation_function_name = 'emission_total_matches_rev_zero';

drop function ggircs_portal.emission_total_matches_rev_zero;

commit;
