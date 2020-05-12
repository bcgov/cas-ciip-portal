-- Verify ggircs-portal:policies/application_revision_policies on pg

begin;

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_application_revision', 'application_revision', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_application_revision', 'application_revision', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_application_revision', 'application_revision', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_application_revision', 'application_revision', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_application_revision', 'application_revision', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('insert', 'ciip_industry_user_insert_application_revision', 'application_revision', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('update', 'ciip_industry_user_update_application_revision', 'application_revision', 'ciip_industry_user');

-- ciip_industry_user (certifier) Policies
select ggircs_portal_private.verify_policy('select', 'certifier_select_application_revision', 'application_revision', 'ciip_industry_user');

-- ciip_guest Policies

rollback;
