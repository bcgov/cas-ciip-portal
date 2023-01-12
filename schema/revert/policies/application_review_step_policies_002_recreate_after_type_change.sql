-- Revert ggircs-portal:policies/application_review_step_policies_002_recreate_after_type_change from pg

begin;

drop policy ciip_industry_user_select_application_review_step on ggircs_portal.application_review_step;

commit;
