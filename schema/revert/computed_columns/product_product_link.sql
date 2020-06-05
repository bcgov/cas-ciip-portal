-- Revert ggircs-portal:computed_columns/product_product_link from pg

begin;

drop function ggircs_portal.product_product_link;

commit;
