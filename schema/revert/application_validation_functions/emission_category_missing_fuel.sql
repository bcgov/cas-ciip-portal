-- Revert ggircs-portal:application_validation_functions/emission_category_missing_fuel from pg

begin;

drop function ggircs_portal.emission_category_missing_fuel;
delete from ggircs_portal.application_revision_validation_function where validation_function_name = 'emisison_category_missing_fuel';

commit;
