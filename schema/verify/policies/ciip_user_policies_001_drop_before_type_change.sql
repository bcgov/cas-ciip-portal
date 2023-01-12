-- Verify ggircs-portal:policies/ciip_user_policies_001_drop_before_type_change on pg

begin;

select ggircs_portal_private.verify_policy_not_present('ciip_analyst_insert_ciip_user', 'ggircs_portal.ciip_user');
select ggircs_portal_private.verify_policy_not_present('ciip_analyst_update_ciip_user', 'ggircs_portal.ciip_user');
select ggircs_portal_private.verify_policy_not_present('ciip_industry_user_insert_ciip_user', 'ggircs_portal.ciip_user');
select ggircs_portal_private.verify_policy_not_present('ciip_industry_user_update_ciip_user', 'ggircs_portal.ciip_user');
select ggircs_portal_private.verify_policy_not_present('ciip_guest_select_ciip_user', 'ggircs_portal.ciip_user');

rollback;