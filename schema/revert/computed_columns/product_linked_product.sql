-- Revert ggircs-portal:computed_columns/product_linked_product from pg

begin;

drop function ggircs_portal.product_linked_product;

commit;
