set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(16);

create role test_superuser superuser;

-- Table exists
select has_table(
  'ggircs_portal', 'gwp',
  'ggircs_portal.gwp should exist, and be a table'
);

select columns_are('ggircs_portal'::name, 'gwp'::name, array[
  'id'::name,
  'gas_id'::name,
  'gwp'::name,
  'description'::name,
  'reporting_year_start'::name,
  'reporting_year_end'::name,
  'created_at'::name,
  'created_by'::name,
  'updated_at'::name,
  'updated_by'::name,
  'deleted_at'::name,
  'deleted_by'::name
]);

-- Row level security tests --

-- Test setup
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.gwp where id < 5;
  $$,
  ARRAY[4::bigint],
    'ciip_administrator can view all data in gwp table'
);

select lives_ok(
  $$
    insert into ggircs_portal.gwp (id, gas_id, gwp, description, reporting_year_start, reporting_year_end) overriding system value
    values (1000, 1, 1, 'admin created', 2021, 2022);
  $$,
    'ciip_administrator can insert data in gwp table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.gwp where description='admin created'
  $$,
    ARRAY[1::bigint],
    'Data was created by ciip_administrator'
);

select lives_ok(
  $$
    update ggircs_portal.gwp set description='admin changed' where id=1000;
  $$,
    'ciip_administrator can change data in gwp table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.gwp where description='admin changed'
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.gwp where id=1000
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_gwp'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.gwp where id < 5;
  $$,
  ARRAY[4::bigint],
    'Industry User can view all data in gwp table'
);

select throws_like(
  $$
    insert into ggircs_portal.gwp (id, gas_id, gwp, description, reporting_year_start, reporting_year_end) overriding system value
    values (1001, 1, 1, 'denied', 2021, 2022);
  $$,
  'permission denied%',
    'Industry User cannot insert into table_gwp'
);

select throws_like(
  $$
    update ggircs_portal.gwp set description='denied' where id=1000;
  $$,
  'permission denied%',
    'Industry User cannot update rows in table_gwp'
);

select throws_like(
  $$
    delete from ggircs_portal.gwp where id=1000
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_gwp'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.gwp where id < 5;
  $$,
  ARRAY[4::bigint],
    'ciip_analyst can view all data in gwp table'
);

select throws_like(
  $$
    insert into ggircs_portal.gwp (id, gas_id, gwp, description, reporting_year_start, reporting_year_end) overriding system value
    values (1001, 1, 1, 'denied', 2021, 2022);
  $$,
  'permission denied%',
    'ciip_analyst cannot insert into table_gwp'
);

select throws_like(
  $$
    update ggircs_portal.gwp set description='denied' where id=1000;
  $$,
  'permission denied%',
    'ciip_analyst cannot update rows in table_gwp'
);

select throws_like(
  $$
    delete from ggircs_portal.gwp where id=1000
  $$,
  'permission denied%',
    'ciip_analyst cannot delete rows from table_gwp'
);

select finish();
rollback;
