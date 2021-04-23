-- Verify ggircs-portal:tables/review_step_001 on pg

begin;

select exists(select * from ggircs_portal.review_step where step_name='application');

rollback;
