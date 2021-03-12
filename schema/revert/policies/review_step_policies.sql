-- Revert ggircs-portal:policies/review_step_policies from pg

begin;

drop policy ciip_administrator_select_review_step on ggircs_portal.review_step;
drop policy ciip_administrator_insert_review_step on ggircs_portal.review_step;
drop policy ciip_administrator_update_review_step on ggircs_portal.review_step;

drop policy ciip_analyst_select_review_step on ggircs_portal.review_step;

commit;
