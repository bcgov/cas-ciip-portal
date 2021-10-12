-- Revert ggircs-portal:application_validation_functions/emission_category_missing_fuel from pg

begin;

drop function ggircs_portal.emission_category_missing_fuel;

commit;
