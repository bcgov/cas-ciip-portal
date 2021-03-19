-- Revert ggircs-portal:tables/product-naics from pg

begin;

drop table ggircs_portal.product_naics;

commit;
