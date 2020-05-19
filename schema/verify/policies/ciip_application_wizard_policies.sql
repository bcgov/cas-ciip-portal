-- Verify ggircs-portal:policies/ciip_application_wizard_policies on pg

begin;

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_ciip_application_wizard', 'ciip_application_wizard', 'ciip_administrator');
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_insert_ciip_application_wizard', 'ciip_application_wizard', 'ciip_administrator');
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_update_ciip_application_wizard', 'ciip_application_wizard', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_ciip_application_wizard', 'ciip_application_wizard', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_ciip_application_wizard', 'ciip_application_wizard', 'ciip_industry_user');

rollback;
