-- Revert ggircs-portal:policies/linked_product_policies from pg

begin;

drop policy ciip_administrator_select_linked_product on ggircs_portal.linked_product;
drop policy ciip_administrator_insert_linked_product on ggircs_portal.linked_product;
drop policy ciip_administrator_update_linked_product on ggircs_portal.linked_product;

drop policy ciip_analyst_select_linked_product on ggircs_portal.linked_product;

drop policy ciip_industry_user_select_linked_product on ggircs_portal.linked_product;

commit;
