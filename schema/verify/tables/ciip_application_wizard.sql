-- Verify ggircs-portal:table_ciip_application_wizard on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_application_wizard', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'ciip_application_wizard', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'ciip_application_wizard', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'ciip_application_wizard', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'ciip_application_wizard', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'ciip_application_wizard', 'ciip_industry_user');

-- ciip_guest Grants

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_ciip_application_wizard', 'ciip_application_wizard', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_ciip_application_wizard', 'ciip_application_wizard', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_ciip_application_wizard', 'ciip_application_wizard', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_ciip_application_wizard', 'ciip_application_wizard', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_ciip_application_wizard', 'ciip_application_wizard', 'ciip_industry_user');

-- ciip_guest Policies

rollback;
