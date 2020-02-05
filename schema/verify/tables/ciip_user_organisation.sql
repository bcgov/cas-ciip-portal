-- Verify ggircs-portal:table_user_organisation on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_user_organisation', 'select');

-- ciip_administrator Grants
select ggircs_portal.verify_grant('select', 'ciip_user_organisation', 'ciip_administrator');
select ggircs_portal.verify_grant('insert', 'ciip_user_organisation', 'ciip_administrator');
select ggircs_portal.verify_grant('update', 'ciip_user_organisation', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal.verify_grant('select', 'ciip_user_organisation', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal.verify_grant('select', 'ciip_user_organisation', 'ciip_industry_user');
select ggircs_portal.verify_grant('insert', 'ciip_user_organisation', 'ciip_industry_user');

-- ciip_guest Grants

-- ciip_administrator Policies
select ggircs_portal.verify_policy('select', 'ciip_administrator_select_ciip_user_organisation', 'ciip_user_organisation', 'ciip_administrator');
select ggircs_portal.verify_policy('insert', 'ciip_administrator_insert_ciip_user_organisation', 'ciip_user_organisation', 'ciip_administrator');
select ggircs_portal.verify_policy('update', 'ciip_administrator_update_ciip_user_organisation', 'ciip_user_organisation', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal.verify_policy('select', 'ciip_analyst_select_ciip_user_organisation', 'ciip_user_organisation', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal.verify_policy('select', 'ciip_industry_user_select_ciip_user_organisation', 'ciip_user_organisation', 'ciip_industry_user');
select ggircs_portal.verify_policy('insert', 'ciip_industry_user_insert_ciip_user_organisation', 'ciip_user_organisation', 'ciip_industry_user');

-- ciip_guest Policies

rollback;
