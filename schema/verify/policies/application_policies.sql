-- Verify ggircs-portal:policies/application_policies on pg

begin;

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_application', 'application', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_application', 'application', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_application', 'application', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_application', 'application', 'ciip_analyst');
select ggircs_portal_private.verify_policy('update', 'ciip_analyst_update_application', 'application', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_application', 'application', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('insert', 'ciip_industry_user_insert_application', 'application', 'ciip_industry_user');

-- ciip_industry_user (certifier) Policies
select ggircs_portal_private.verify_policy('select', 'certifier_select_application', 'application', 'ciip_industry_user');

-- ciip_guest Policies

rollback;
