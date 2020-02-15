set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(7);

select has_function(
  'ggircs_portal', 'ciip_incentive', array['text', 'text'],
  'Function ciip_incentive should exist'
);

select results_eq(
  $$
    select incentive_product from ggircs_portal.ciip_incentive('1','1') where product_name = 'Other Pulp (Mechanical pulp, paper, newsprint)';
  $$,
  ARRAY[11320.7746970072::numeric],
  'ciip incentive function returns correct value when benchmark exists'
);

-- remove benchmark for product_id 29
delete from ggircs_portal.benchmark where product_id = 29;

select results_eq(
  $$
    select incentive_product from ggircs_portal.ciip_incentive('1','1') where product_name = 'Other Pulp (Mechanical pulp, paper, newsprint)';
  $$,
  ARRAY[0::numeric],
  'ciip incentive function returns incentive_product=0 when benchmark does not exist'
);

set role ciip_administrator;

select lives_ok(
  $$
    select ggircs_portal.ciip_incentive('1','1')
  $$,
    'ciip_administrator can execute the ciip_incentive function'
);

set role ciip_analyst;

select lives_ok(
  $$
    select ggircs_portal.ciip_incentive('1','1')
  $$,
    'ciip_analyst can execute the ciip_incentive function'
);

set role ciip_industry_user;

select throws_like(
  $$
    select ggircs_portal.ciip_incentive('1','1')
  $$,
  'permission denied%',
    'ciip_industry_user cannot execute the ciip_incentive function'
);

set role ciip_guest;

select throws_like(
  $$
    select ggircs_portal.ciip_incentive('1','1')
  $$,
  'permission denied%',
    'ciip_guest cannot execute the ciip_incentive function'
);


select finish();
rollback;
