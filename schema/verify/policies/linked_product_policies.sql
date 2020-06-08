-- Verify ggircs-portal:policies/linked_product_policies on pg

begin;

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_linked_product', 'linked_product', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_linked_product', 'linked_product', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_linked_product', 'linked_product', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_linked_product', 'linked_product', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_linked_product', 'linked_product', 'ciip_industry_user');

rollback;
