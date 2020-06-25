-- Verify ggircs-portal:policies/facility_policies on pg

begin;


select pg_get_functiondef('ggircs_portal_private.get_valid_facility_organisation()'::regprocedure);

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

-- ciip_industry_user (certifier) Policies
select ggircs_portal_private.verify_policy('select', 'certifier_select_facility', 'facility', 'ciip_industry_user');

-- ciip_guest Policies

rollback;
