-- Verify ggircs-portal:policies/application_review_step_policies_002_recreate_after_type_change on pg

begin;

select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_application_review_step', 'application_review_step', 'ciip_industry_user');

rollback;
