set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(5);

select has_function(
  'ggircs_portal', 'ciip_incentive', array['integer', 'integer'],
  'Function ciip_incentive should exist'
);

set role ciip_administrator;

select lives_ok(
  $$
    select ggircs_portal.ciip_incentive(1,1)
  $$,
    'ciip_administrator can execute the ciip_incentive function'
);

set role ciip_analyst;

select lives_ok(
  $$
    select ggircs_portal.ciip_incentive(1,1)
  $$,
    'ciip_analyst can execute the ciip_incentive function'
);

set role ciip_industry_user;

select throws_like(
  $$
    select ggircs_portal.ciip_incentive(1,1)
  $$,
  'permission denied%',
    'ciip_industry_user cannot execute the ciip_incentive function'
);

set role ciip_guest;

select throws_like(
  $$
    select ggircs_portal.ciip_incentive(1,1)
  $$,
  'permission denied%',
    'ciip_guest cannot execute the ciip_incentive function'
);


select finish();
rollback;
