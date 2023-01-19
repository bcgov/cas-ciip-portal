-- Verify ggircs-portal:policies/application_review_step_policies_001_drop_before_type_change on pg

begin;

select ggircs_portal_private.verify_policy_not_present('ciip_industry_user_select_application_review_step', 'ggircs_portal.application_review_step');

rollback;
