-- Revert ggircs-portal:application_validation_functions/fuels_match_emissions_category from pg

begin;

drop function ggircs_portal.fuels_match_emissions_category;

commit;
