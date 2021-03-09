-- Revert ggircs-portal:types/review_step_name from pg

begin;

drop type ggircs_portal.review_step_name;

commit;
