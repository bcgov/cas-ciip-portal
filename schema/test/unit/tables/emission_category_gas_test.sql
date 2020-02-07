set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(15);

create role test_superuser superuser;

-- Table exists
select has_table(
  'ggircs_portal', 'emission_category_gas',
  'ggircs_portal.emission_category_gas should exist, and be a table'
);

-- Row level security tests --

-- Test setup
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.emission_category_gas where id < 10;
  $$,
  ARRAY[9::bigint],
    'ciip_administrator can view all data in emission_category_gas table'
);

select lives_ok(
  $$
    insert into ggircs_portal.emission_category_gas (id, emission_category_description) overriding system value
    values (1000, 'admin created');
  $$,
    'ciip_administrator can insert data in emission_category_gas table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.emission_category_gas where emission_category_description='admin created'
  $$,
    ARRAY[1::bigint],
    'Data was created by ciip_administrator'
);

select lives_ok(
  $$
    update ggircs_portal.emission_category_gas set emission_category_description='admin changed' where id=1000;
  $$,
    'ciip_administrator can change data in emission_category_gas table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.emission_category_gas where emission_category_description='admin changed'
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.emission_category_gas where id=1
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_emission_category_gas'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.emission_category_gas where id < 10;
  $$,
  ARRAY[9::bigint],
    'Industry User can view all data in emission_category_gas table'
);

select throws_like(
  $$
    insert into ggircs_portal.emission_category_gas (id, emission_category_description) overriding system value
    values (1001, 'denied');
  $$,
  'permission denied%',
    'Industry User cannot insert into table_emission_category_gas'
);

select throws_like(
  $$
    update ggircs_portal.emission_category_gas set emission_category_description='denied' where id=1;
  $$,
  'permission denied%',
    'Industry User cannot update rows in table_emission_category_gas'
);

select throws_like(
  $$
    delete from ggircs_portal.emission_category_gas where id=1
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_emission_category_gas'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.emission_category_gas where id < 10;
  $$,
  ARRAY[9::bigint],
    'ciip_analyst can view all data in emission_category_gas table'
);

select throws_like(
  $$
    insert into ggircs_portal.emission_category_gas (id, emission_category_description) overriding system value
    values (1001, 'denied');
  $$,
  'permission denied%',
    'ciip_analyst cannot insert into table_emission_category_gas'
);

select throws_like(
  $$
    update ggircs_portal.emission_category_gas set emission_category_description='denied' where id=1;
  $$,
  'permission denied%',
    'ciip_analyst cannot update rows in table_emission_category_gas'
);

select throws_like(
  $$
    delete from ggircs_portal.emission_category_gas where id=1
  $$,
  'permission denied%',
    'ciip_analyst cannot delete rows from table_emission_category_gas'
);

select finish();
rollback;
