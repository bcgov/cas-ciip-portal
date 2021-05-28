-- Deploy ggircs-portal:tables/application_review_step_001 to pg
-- requires: tables/application_review_step

begin;

delete from ggircs_portal.application_review_step
where review_step_id > 1
and application_id in (
  select id from ggircs_portal.application
  where reporting_year = 2018
);

commit;
