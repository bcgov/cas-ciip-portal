-- Verify ggircs-portal:table_facility on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.facility', 'select');
select pg_get_functiondef('ggircs_portal_private.get_valid_facility_organisation()'::regprocedure);

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'facility', 'ciip_administrator');
select ggircs_portal_private.verify_grant('insert', 'facility', 'ciip_administrator');
select ggircs_portal_private.verify_grant('update', 'facility', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'facility', 'ciip_analyst');
select ggircs_portal_private.verify_grant('insert', 'facility', 'ciip_analyst');
select ggircs_portal_private.verify_grant('update', 'facility', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'facility', 'ciip_industry_user');
select ggircs_portal_private.verify_grant('insert', 'facility', 'ciip_industry_user');

-- ciip_guest Grants

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_facility', 'facility', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_facility', 'facility', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_facility', 'facility', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_facility', 'facility', 'ciip_analyst');
select ggircs_portal_private.verify_policy('insert', 'ciip_analyst_insert_facility', 'facility', 'ciip_analyst');
select ggircs_portal_private.verify_policy('update', 'ciip_analyst_update_facility', 'facility', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_facility', 'facility', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('insert', 'ciip_industry_user_insert_facility', 'facility', 'ciip_industry_user');

-- ciip_guest Policies

rollback;
