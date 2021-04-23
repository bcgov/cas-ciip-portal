-- Deploy ggircs-portal:tables/review_step_001 to pg
-- requires: tables/review_step

begin;

update ggircs_portal.review_step set step_name='application' where step_name='other';

commit;
