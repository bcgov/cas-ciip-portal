-- Revert ggircs-portal:policies/product_policies from pg

begin;

drop policy ciip_administrator_select_product on ggircs_portal.product;
drop policy ciip_administrator_insert_product on ggircs_portal.product;
drop policy ciip_administrator_update_product on ggircs_portal.product;

drop policy ciip_analyst_select_product on ggircs_portal.product;

drop policy ciip_industry_user_select_product on ggircs_portal.product;

commit;
