-- Revert ggircs-portal:types/ciip_product_state from pg

begin;

drop type ggircs_portal.ciip_product_state;

commit;
