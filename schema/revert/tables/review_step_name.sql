-- Revert ggircs-portal:types/review_step_name from pg

begin;

drop table ggircs_portal.review_step_name;

commit;
