-- Revert ggircs-portal:policies/product_link_policies from pg

begin;

drop policy ciip_administrator_select_product_link on ggircs_portal.product_link;
drop policy ciip_administrator_insert_product_link on ggircs_portal.product_link;
drop policy ciip_administrator_update_product_link on ggircs_portal.product_link;

drop policy ciip_analyst_select_product_link on ggircs_portal.product_link;

drop policy ciip_industry_user_select_product_link on ggircs_portal.product_link;

commit;
