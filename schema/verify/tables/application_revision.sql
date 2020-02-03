-- Verify ggircs-portal:table_application_revision on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.application_revision', 'select');

-- ciip_administrator Grants
select ggircs_portal.verify_grant('select', 'application_revision', 'ciip_administrator');
select ggircs_portal.verify_grant('insert', 'application_revision', 'ciip_administrator');
select ggircs_portal.verify_grant('update', 'application_revision', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal.verify_grant('select', 'application_revision', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal.verify_grant('select', 'application_revision', 'ciip_industry_user');
select ggircs_portal.verify_grant('insert', 'application_revision', 'ciip_industry_user');

-- ciip_guest Grants

-- ciip_administrator Policies
select ggircs_portal.verify_policy('select', 'ciip_administrator_select_application_revision', 'application_revision', 'ciip_administrator');
select ggircs_portal.verify_policy('insert', 'ciip_administrator_insert_application_revision', 'application_revision', 'ciip_administrator');
select ggircs_portal.verify_policy('update', 'ciip_administrator_update_application_revision', 'application_revision', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal.verify_policy('select', 'ciip_analyst_select_application_revision', 'application_revision', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal.verify_policy('select', 'ciip_industry_user_select_application_revision', 'application_revision', 'ciip_industry_user');
select ggircs_portal.verify_policy('insert', 'ciip_industry_user_insert_application_revision', 'application_revision', 'ciip_industry_user');
select ggircs_portal.verify_policy('update', 'ciip_industry_user_update_application_revision', 'application_revision', 'ciip_industry_user');

-- ciip_guest Policies


rollback;
