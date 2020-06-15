-- Revert ggircs-portal:types/linked_product_return from pg

begin;

drop type ggircs_portal.linked_product_return;

commit;
