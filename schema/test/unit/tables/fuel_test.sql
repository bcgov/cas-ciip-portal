set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(15);

create role test_superuser superuser;

-- Table exists
select has_table(
  'ggircs_portal', 'fuel',
  'ggircs_portal.fuel should exist, and be a table'
);

-- Row level security tests --

-- Test setup
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.fuel where id < 10;
  $$,
  ARRAY[9::bigint],
    'ciip_administrator can view all data in fuel table'
);

select lives_ok(
  $$
    insert into ggircs_portal.fuel (id, name, swrs_fuel_mapping_id) overriding system value
    values (1000, 'admin created', 1);
  $$,
    'ciip_administrator can insert data in fuel table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.fuel where name='admin created'
  $$,
    ARRAY[1::bigint],
    'Data was created by ciip_administrator'
);

select lives_ok(
  $$
    update ggircs_portal.fuel set name='admin changed' where id=1000;
  $$,
    'ciip_administrator can change data in fuel table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.fuel where name='admin changed'
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.fuel where id=1
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_fuel'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.fuel where id < 10;
  $$,
  ARRAY[9::bigint],
    'Industry User can view all data in fuel table'
);

select throws_like(
  $$
    insert into ggircs_portal.fuel (id, name, swrs_fuel_mapping_id) overriding system value
    values (1001, 'denied', 1);
  $$,
  'permission denied%',
    'Industry User cannot insert into table_fuel'
);

select throws_like(
  $$
    update ggircs_portal.fuel set name='denied' where id=1;
  $$,
  'permission denied%',
    'Industry User cannot update rows in table_fuel'
);

select throws_like(
  $$
    delete from ggircs_portal.fuel where id=1
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_fuel'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.fuel where id < 10;
  $$,
  ARRAY[9::bigint],
    'ciip_analyst can view all data in fuel table'
);

select throws_like(
  $$
    insert into ggircs_portal.fuel (id, name, swrs_fuel_mapping_id) overriding system value
    values (1001, 'denied', 1);
  $$,
  'permission denied%',
    'ciip_analyst cannot insert into table_fuel'
);

select throws_like(
  $$
    update ggircs_portal.fuel set name='denied' where id=1;
  $$,
  'permission denied%',
    'ciip_analyst cannot update rows in table_fuel'
);

select throws_like(
  $$
    delete from ggircs_portal.fuel where id=1
  $$,
  'permission denied%',
    'ciip_analyst cannot delete rows from table_fuel'
);

select finish();
rollback;
