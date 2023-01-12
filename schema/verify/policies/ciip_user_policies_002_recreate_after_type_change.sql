-- Verify ggircs-portal:policies/ciip_user_policies_002_recreate_after_type_change on pg

begin;

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('insert', 'ciip_analyst_insert_ciip_user', 'ciip_user', 'ciip_analyst');
select ggircs_portal_private.verify_policy('update', 'ciip_analyst_update_ciip_user', 'ciip_user', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('insert', 'ciip_industry_user_insert_ciip_user', 'ciip_user', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('update', 'ciip_industry_user_update_ciip_user', 'ciip_user', 'ciip_industry_user');

-- ciip_guest Policies
select ggircs_portal_private.verify_policy('select', 'ciip_guest_select_ciip_user', 'ciip_user', 'ciip_guest');

rollback;
