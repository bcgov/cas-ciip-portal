-- Verify ggircs-portal:table_product_form on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.product_form', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'product_form', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'product_form', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'product_form', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'product_form', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'product_form', 'ciip_industry_user');

-- ciip_guest Grants

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_product_form', 'product_form', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_product_form', 'product_form', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_product_form', 'product_form', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_product_form', 'product_form', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_product_form', 'product_form', 'ciip_industry_user');

-- ciip_guest Policies

rollback;
