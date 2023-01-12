-- Deploy ggircs-portal:policies/application_review_step_policies_001_drop_before_type_change to pg

begin;

drop policy ciip_industry_user_select_application_review_step on ggircs_portal.application_review_step;

commit;

