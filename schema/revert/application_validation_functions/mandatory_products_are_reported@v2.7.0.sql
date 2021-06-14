-- Revert ggircs-portal:application_validation_functions/mandatory_products_are_reported from pg

begin;

delete from ggircs_portal.application_revision_validation_function where validation_function_name = 'mandatory_products_are_reported';

drop function ggircs_portal.mandatory_products_are_reported;

commit;
