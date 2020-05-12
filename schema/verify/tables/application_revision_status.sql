-- Verify ggircs-portal:table_application on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.application_revision_status', 'select');
-- select pg_get_functiondef('ggircs_portal_private.get_valid_applications_via_revision_status()'::regprocedure);

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'application_revision_status', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'application_revision_status', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'application_revision_status', 'ciip_analyst');
select ggircs_portal_private.verify_grant('insert', 'application_revision_status', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'application_revision_status', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('insert', 'application_revision_status', 'ciip_industry_user');

-- ciip_guest Grants

-- -- ciip_administrator Policies
-- select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_application_revision_status', 'application_revision_status', 'ciip_administrator');
-- select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_application_revision_status', 'application_revision_status', 'ciip_administrator');

-- -- ciip_analyst Policies
-- select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_application_revision_status', 'application_revision_status', 'ciip_analyst');
-- select ggircs_portal_private.verify_policy('insert', 'ciip_analyst_insert_application_revision_status', 'application_revision_status', 'ciip_analyst');

-- -- ciip_industry_user Policies
-- select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_application_revision_status', 'application_revision_status', 'ciip_industry_user');
-- select ggircs_portal_private.verify_policy('insert', 'ciip_industry_user_insert_application_revision_status', 'application_revision_status', 'ciip_industry_user');

-- ciip_guest Policies

rollback;
