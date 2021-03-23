-- Revert ggircs-portal:mutations/create_product_naics_code from pg

begin;

drop function ggircs_portal.create_product_naics_code;

commit;
