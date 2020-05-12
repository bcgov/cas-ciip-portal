-- Verify ggircs-portal:policies/application_revision_status_policies on pg

BEGIN;

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_application_revision_status', 'application_revision_status', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_application_revision_status', 'application_revision_status', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_application_revision_status', 'application_revision_status', 'ciip_analyst');
select ggircs_portal_private.verify_policy('insert', 'ciip_analyst_insert_application_revision_status', 'application_revision_status', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_application_revision_status', 'application_revision_status', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('insert', 'ciip_industry_user_insert_application_revision_status', 'application_revision_status', 'ciip_industry_user');

--ciip_guest Policies

ROLLBACK;
