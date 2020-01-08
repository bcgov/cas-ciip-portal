-- Revert ggircs-portal:table_product_form from pg

begin;

drop table ggircs_portal.product_form;

commit;
