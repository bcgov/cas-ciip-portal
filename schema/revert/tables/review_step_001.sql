-- Revert ggircs-portal:tables/review_step_001 from pg

begin;

update ggircs_portal.review_step set step_name='other' where step_name='application';

commit;
