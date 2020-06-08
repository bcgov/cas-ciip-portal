-- Revert ggircs-portal:tables/product-link from pg

begin;

drop table ggircs_portal.linked_product;

commit;
