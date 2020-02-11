set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(15);

create role test_superuser superuser;

-- Table exists
select has_table(
  'ggircs_portal', 'benchmark',
  'ggircs_portal.benchmark should exist, and be a table'
);

-- Row level security tests --

-- Test setup
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.benchmark where id < 10;
  $$,
  ARRAY[9::bigint],
    'ciip_administrator can view all data in benchmark table'
);

select lives_ok(
  $$
    insert into ggircs_portal.benchmark (id, product_id, benchmark, eligibility_threshold, incentive_multiplier, excludes_exported_energy, start_reporting_year, end_reporting_year) overriding system value
    values (1000, 1, 9999, 10000, 1, false, 2019, 2020);
  $$,
    'ciip_administrator can insert data in benchmark table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.benchmark where benchmark=9999
  $$,
    ARRAY[1::bigint],
    'Data was created by ciip_administrator'
);

select lives_ok(
  $$
    update ggircs_portal.benchmark set benchmark=99999 where benchmark=9999;
  $$,
    'ciip_administrator can change data in benchmark table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.benchmark where benchmark = 99999;
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.benchmark where id=1
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_benchmark'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select throws_like(
  $$
    select * from  ggircs_portal.benchmark;
  $$,
  'permission denied%',
    'Industry User cannot view rows in table_benchmark'
);

select throws_like(
  $$
    insert into ggircs_portal.benchmark (id, product_id, benchmark, eligibility_threshold, incentive_multiplier, excludes_exported_energy, start_reporting_year, end_reporting_year) overriding system value
    values (1001, 1, 9999, 10000, 1, false, 2019, 2020);
  $$,
  'permission denied%',
    'Industry User cannot insert into table_benchmark'
);

select throws_like(
  $$
    update ggircs_portal.benchmark set benchmark=1 where id=1;
  $$,
  'permission denied%',
    'Industry User cannot update rows in table_benchmark'
);

select throws_like(
  $$
    delete from ggircs_portal.benchmark where id=1
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_benchmark'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.benchmark where id < 10;
  $$,
  ARRAY[9::bigint],
    'ciip_analyst can view all data in benchmark table'
);

select throws_like(
  $$
    insert into ggircs_portal.benchmark (id, product_id, benchmark, eligibility_threshold, incentive_multiplier, excludes_exported_energy, start_reporting_year, end_reporting_year) overriding system value
    values (1001, 1, 9999, 10000, 1, false, 2019, 2020);
  $$,
  'permission denied%',
    'ciip_analyst cannot insert into table_benchmark'
);

select throws_like(
  $$
    update ggircs_portal.benchmark set benchmark=1 where id=1;
  $$,
  'permission denied%',
    'ciip_analyst cannot update rows in table_benchmark'
);

select throws_like(
  $$
    delete from ggircs_portal.benchmark where id=1
  $$,
  'permission denied%',
    'ciip_analyst cannot delete rows from table_benchmark'
);

select finish();
rollback;
