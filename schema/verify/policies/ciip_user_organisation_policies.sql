-- Verify ggircs-portal:policies/ciip_user_organisation_policies on pg

begin;

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_ciip_user_organisation', 'ciip_user_organisation', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_ciip_user_organisation', 'ciip_user_organisation', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_ciip_user_organisation', 'ciip_user_organisation', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_ciip_user_organisation', 'ciip_user_organisation', 'ciip_analyst');
select ggircs_portal_private.verify_policy('update', 'ciip_analyst_update_ciip_user_organisation', 'ciip_user_organisation', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_ciip_user_organisation', 'ciip_user_organisation', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('insert', 'ciip_industry_user_insert_ciip_user_organisation', 'ciip_user_organisation', 'ciip_industry_user');

rollback;
