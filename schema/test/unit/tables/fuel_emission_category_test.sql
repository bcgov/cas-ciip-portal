set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(15);

create role test_superuser superuser;

-- Table exists
select has_table(
  'ggircs_portal', 'fuel_emission_category',
  'ggircs_portal.fuel_emission_category should exist, and be a table'
);

-- Row level security tests --

-- Test setup
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.fuel_emission_category where id < 10;
  $$,
  ARRAY[9::bigint],
    'ciip_administrator can view all data in fuel_emission_category table'
);

select lives_ok(
  $$
    insert into ggircs_portal.fuel_emission_category (id, fuel_id, 
  emission_category_id) overriding system value
  -- fuel_id 85 is Vented Natural Gas
    values (1000, 85,1);
  $$,
    'ciip_administrator can insert data in fuel_emission_category table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.fuel_emission_category where fuel_id=85
  $$,
    ARRAY[1::bigint],
    'Data was created by ciip_administrator'
);

select lives_ok(
  $$
  -- fuel_id 85 is Kerosene
    update ggircs_portal.fuel_emission_category set fuel_id=40 where id=1000;
  $$,
    'ciip_administrator can change data in fuel_emission_category table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.fuel_emission_category where fuel_id=40
  $$,
    ARRAY[3::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.fuel_emission_category where id=1
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_fuel_emission_category'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.fuel_emission_category where id < 10;
  $$,
  ARRAY[9::bigint],
    'Industry User can view all data in fuel_emission_category table'
);

select throws_like(
  $$
    insert into ggircs_portal.fuel_emission_category (id, fuel_id, 
  emission_category_id) overriding system value
    values (1001, 1, 1);
  $$,
  'permission denied%',
    'Industry User cannot insert into table_fuel_emission_category'
);

select throws_like(
  $$
    update ggircs_portal.fuel_emission_category set fuel_id=2 where id=1;
  $$,
  'permission denied%',
    'Industry User cannot update rows in table_fuel_emission_category'
);

select throws_like(
  $$
    delete from ggircs_portal.fuel_emission_category where id=1
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_fuel_emission_category'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.fuel_emission_category where id < 10;
  $$,
  ARRAY[9::bigint],
    'ciip_analyst can view all data in fuel_emission_category table'
);

select throws_like(
  $$
    insert into ggircs_portal.fuel_emission_category (id, fuel_id, emission_category_id) overriding system value
    values (1001, 1, 1);
  $$,
  'permission denied%',
    'ciip_analyst cannot insert into table_fuel_emission_category'
);

select throws_like(
  $$
    update ggircs_portal.fuel_emission_category set fuel_id=7 where id=1;
  $$,
  'permission denied%',
    'ciip_analyst cannot update rows in table_fuel_emission_category'
);

select throws_like(
  $$
    delete from ggircs_portal.fuel_emission_category where id=1
  $$,
  'permission denied%',
    'ciip_analyst cannot delete rows from table_fuel_emission_category'
);

select finish();
rollback;
