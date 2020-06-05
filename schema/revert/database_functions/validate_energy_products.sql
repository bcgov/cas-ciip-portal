-- Revert ggircs-portal:database_functions/validate_energy_products from pg

begin;

drop function ggircs_portal_private.validate_energy_products;

commit;
