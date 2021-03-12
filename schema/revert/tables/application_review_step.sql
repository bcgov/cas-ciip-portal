-- Revert ggircs-portal:tables/application_review_step from pg

begin;

drop table ggircs_portal.application_review_step;

commit;
