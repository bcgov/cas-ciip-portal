-- Revert ggircs-portal:application_validation_functions/no_reported_ciip_product from pg

begin;

drop function ggircs_portal.no_reported_ciip_product;

commit;
