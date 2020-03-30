-- Verify ggircs-portal:tables/emission_category on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.emission_category', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'emission_category', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'emission_category', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'emission_category', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'emission_category', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'emission_category', 'ciip_industry_user');

-- ciip_guest Grants

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_emission_category', 'emission_category', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_emission_category', 'emission_category', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_emission_category', 'emission_category', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_emission_category', 'emission_category', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_emission_category', 'emission_category', 'ciip_industry_user');

-- ciip_guest Policies

rollback;
