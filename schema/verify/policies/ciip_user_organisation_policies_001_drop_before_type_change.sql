-- Verify ggircs-portal:policies/ciip_user_organisation_policies_001_drop_before_type_change on pg

begin;

-- The following lines can be uncommented if we only use the verify script as we deploy
-- If using `sqitch verify` to assess the constistency of the database, the following changes will
-- be invalidated by the associated ..._002_recreate_after_type_change migration


-- select ggircs_portal_private.verify_policy_not_present('ciip_industry_user_select_ciip_user_organisation', 'ggircs_portal.ciip_user_organisation');
-- select ggircs_portal_private.verify_policy_not_present('ciip_industry_user_insert_ciip_user_organisation', 'ggircs_portal.ciip_user_organisation');

rollback;
