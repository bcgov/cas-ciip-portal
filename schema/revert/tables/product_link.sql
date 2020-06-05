-- Revert ggircs-portal:tables/product-link from pg

begin;

drop table ggircs_portal.product_link;

commit;
