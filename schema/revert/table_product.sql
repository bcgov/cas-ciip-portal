-- Revert ggircs-portal:product from pg

begin;

drop table ggircs_portal.product;

commit;
