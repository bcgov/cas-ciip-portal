-- Verify ggircs-portal:table_organisation on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.organisation', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'organisation', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'organisation', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'organisation', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'organisation', 'ciip_analyst');
select ggircs_portal_private.verify_grant('insert', 'organisation', 'ciip_analyst');
select ggircs_portal_private.verify_grant('update', 'organisation', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'organisation', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('insert', 'organisation', 'ciip_industry_user');

-- ciip_guest Grants

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_organisation', 'organisation', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_organisation', 'organisation', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_organisation', 'organisation', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_organisation', 'organisation', 'ciip_analyst');
select ggircs_portal_private.verify_policy('insert', 'ciip_analyst_insert_organisation', 'organisation', 'ciip_analyst');
select ggircs_portal_private.verify_policy('update', 'ciip_analyst_update_organisation', 'organisation', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_organisation', 'organisation', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('insert', 'ciip_industry_user_insert_organisation', 'organisation', 'ciip_industry_user');

-- ciip_guest Policies

rollback;
