-- Revert ggircs-portal:tables/review_step from pg

begin;

drop table ggircs_portal.review_step;

commit;
