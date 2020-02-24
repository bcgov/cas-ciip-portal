set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(18);

create role test_superuser superuser;

-- Table exists
select has_table(
  'ggircs_portal', 'organisation',
  'ggircs_portal.organisation should exist, and be a table'
);

-- Row level security tests --

-- Test setup
alter table ggircs_portal.ciip_user disable trigger _welcome_email;

insert into ggircs_portal.ciip_user(id, uuid, first_name)
overriding system value
values (999, '11111111-1111-1111-1111-111111111111'::uuid, 'test_user');

insert into ggircs_portal.organisation(id, operator_name)
overriding system value
values (999, 'test_org1');

insert into ggircs_portal.organisation(id, operator_name)
overriding system value
values (1000, 'test_org2');

set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.organisation where id=999 or id=1000;
  $$,
  ARRAY[2::bigint],
    'ciip_administrator can view all data in organisation table'
);

select lives_ok(
  $$
    insert into ggircs_portal.organisation (operator_name)
    values ('admin added');
  $$,
    'ciip_administrator can insert data in organisation table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.organisation where operator_name='admin added';
  $$,
  ARRAY[1::bigint],
    'data was inserted by ciip_administrator'
);

select lives_ok(
  $$
    update ggircs_portal.organisation set operator_name = 'admin changed' where operator_name='admin added';
  $$,
    'ciip_administrator can change data in organisation table'
);

select results_eq(
  $$
    select count(id) from ggircs_portal.organisation where operator_name='admin changed';
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.organisation where operator_name='admin changed';
  $$,
  'permission denied%',
  'ciip_administrator cannot delete data in organisation table'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.organisation where id=999 or id=1000;
  $$,
  ARRAY[2::bigint],
    'ciip_industry_user can view all data in organisation table'
);

select lives_ok(
  $$
    insert into ggircs_portal.organisation (operator_name)
    values ('user added');
  $$,
    'ciip_industry_user can insert data in organisation table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.organisation where operator_name='user added';
  $$,
  ARRAY[1::bigint],
    'data was inserted by ciip_industry_user'
);

select throws_like(
  $$
    update ggircs_portal.organisation set operator_name='I cant do this' where operator_name='user added';
  $$,
  'permission denied%',
  'ciip_industry_user cannot update data in organisation table'
);

select throws_like(
  $$
    delete from ggircs_portal.organisation where operator_name='user added';
  $$,
  'permission denied%',
  'ciip_industry_user cannot delete data in organisation table'
);

-- CIIP ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.organisation where id=999 or id=1000;
  $$,
  ARRAY[2::bigint],
    'ciip_analyst can view all data in organisation table'
);

select lives_ok(
  $$
    insert into ggircs_portal.organisation (operator_name)
    values ('analyst added');
  $$,
    'ciip_analyst can insert data in organisation table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.organisation where operator_name='analyst added';
  $$,
  ARRAY[1::bigint],
    'data was inserted by ciip_analyst'
);

select lives_ok(
  $$
    update ggircs_portal.organisation set operator_name = 'analyst changed' where operator_name='analyst added';
  $$,
    'ciip_analyst can change data in organisation table'
);

select results_eq(
  $$
    select count(id) from ggircs_portal.organisation where operator_name='analyst changed';
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_analyst'
);

select throws_like(
  $$
    delete from ggircs_portal.organisation where operator_name='analyst changed';
  $$,
  'permission denied%',
  'ciip_analyst cannot delete data in organisation table'
);

select finish();
rollback;
