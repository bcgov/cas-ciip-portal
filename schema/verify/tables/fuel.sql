-- Verify ggircs-portal:table_fuel on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.fuel', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'fuel', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'fuel', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'fuel', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'fuel', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'fuel', 'ciip_industry_user');

-- ciip_guest Grants

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_fuel', 'fuel', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_fuel', 'fuel', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_fuel', 'fuel', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_fuel', 'fuel', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_fuel', 'fuel', 'ciip_industry_user');

-- ciip_guest Policies

rollback;
