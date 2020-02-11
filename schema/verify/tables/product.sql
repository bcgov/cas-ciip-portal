-- Verify ggircs-portal:product on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.product', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'product', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'product', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'product', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'product', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'product', 'ciip_industry_user');

-- ciip_guest Grants

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_product', 'product', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_product', 'product', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_product', 'product', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_product', 'product', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_product', 'product', 'ciip_industry_user');

-- ciip_guest Policies

rollback;
