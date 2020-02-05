set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(15);

-- Table exists
select has_table(
  'ggircs_portal', 'form_json',
  'ggircs_portal.form_json should exist, and be a table'
);


-- Row level security tests --

-- Test setup
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.form_json
  $$,
  ARRAY[5::bigint],
  'ciip_administrator can view all data in form_json table'
);

select lives_ok(
  $$
    insert into ggircs_portal.form_json (name,slug,short_name,description,form_json,prepopulate_from_ciip,prepopulate_from_swrs)
    values ('test', 'test', 'test', 'test', '{}', true, true)
  $$,
    'ciip_administrator can insert data in form_json table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.form_json where name = 'test'
  $$,
  ARRAY[1::bigint],
  'data was inserted by ciip_administrator'
);

select lives_ok(
  $$
    update ggircs_portal.form_json set name = 'changed by admin' where name='test';
  $$,
    'ciip_administrator can change data in form_json table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.form_json where name = 'changed by admin'
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.form_json where id=1
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_form_json'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.form_json
  $$,
  ARRAY[6::bigint],
  'ciip_industry_user can view all data in form_json table'
);

select throws_like(
  $$
    insert into ggircs_portal.form_json (name,slug,short_name,description,form_json,prepopulate_from_ciip,prepopulate_from_swrs)
    values ('test', 'test', 'test', 'test', '{}', true, true)
  $$,
  'permission denied%',
    'Industry User cannot insert rows into table_form_json'
);

select throws_like(
  $$
    update ggircs_portal.form_json set name='not allowed' where id=1;
  $$,
  'permission denied%',
    'Industry User cannot update rows in table_form_json'
);

select throws_like(
  $$
    delete from ggircs_portal.form_json where id=1
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_form_json'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.form_json
  $$,
  ARRAY[6::bigint],
  'ciip_analyst can view all data in form_json table'
);

select throws_like(
  $$
    insert into ggircs_portal.form_json (name,slug,short_name,description,form_json,prepopulate_from_ciip,prepopulate_from_swrs)
    values ('test', 'test', 'test', 'test', '{}', true, true)
  $$,
  'permission denied%',
    'ciip_analyst cannot insert rows into table_form_json'
);

select throws_like(
  $$
    update ggircs_portal.form_json set name='not allowed' where id=1;
  $$,
  'permission denied%',
    'ciip_analyst cannot update rows in table_form_json'
);

select throws_like(
  $$
    delete from ggircs_portal.form_json where id=1
  $$,
  'permission denied%',
    'ciip_analyst cannot delete rows from table_form_json'
);

select finish();
rollback;
