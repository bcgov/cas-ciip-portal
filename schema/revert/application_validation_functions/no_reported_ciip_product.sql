-- Revert ggircs-portal:application_validation_functions/no_reported_ciip_product from pg

begin;

drop function ggircs_portal.no_reported_ciip_product;
delete from ggircs_portal.application_revision_validation_function where validation_function_name = 'no_reported_ciip_product';

commit;
