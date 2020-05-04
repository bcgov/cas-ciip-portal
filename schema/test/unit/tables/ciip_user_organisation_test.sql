set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(15);

create role test_superuser superuser;

-- Table exists
select has_table(
  'ggircs_portal', 'ciip_user_organisation',
  'ggircs_portal.ciip_user_organisation should exist, and be a table'
);

-- Row level security tests --

-- Test setup
alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.ciip_user disable trigger _welcome_email;

insert into ggircs_portal.ciip_user(id, uuid, first_name)
overriding system value
values (999, '11111111-1111-1111-1111-111111111111'::uuid, 'test_user'),
       (888, '22222222-2222-2222-2222-222222222222'::uuid, 'test_user');

insert into ggircs_portal.organisation(id, operator_name)
overriding system value
values (999, 'test_org'), (888, 'test_org'), (777, 'test_org');

insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id)
values (888, 888);

set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select lives_ok(
  $$
    select * from ggircs_portal.ciip_user_organisation
  $$,
    'ciip_administrator can view all data in ciip_user_organisation table'
);

select lives_ok(
  $$
    insert into ggircs_portal.ciip_user_organisation (user_id, organisation_id)
    values (999, 999);
  $$,
    'ciip_administrator can insert data in ciip_user_organisation table'
);

select lives_ok(
  $$
    update ggircs_portal.ciip_user_organisation set status = 'rejected' where user_id=999;
  $$,
    'ciip_administrator can change data in ciip_user_organisation table'
);

select results_eq(
  $$
    select count(id) from ggircs_portal.ciip_user_organisation where user_id = 999 and status = 'rejected'
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select user_id from ggircs_portal.ciip_user_organisation
  $$,
  ARRAY['999'::integer],
    'Industry user can view data from ciip_user_organisation where the user_id column matches their id in the ciip_user table'
);

select lives_ok(
  $$
    insert into ggircs_portal.ciip_user_organisation (user_id, organisation_id, status)
    values (999, 888, 'pending')
  $$,
    'Industry user can insert data if the new row contains their own user_id and the new status is PENDING'
);

select set_eq(
  $$
    select user_id from ggircs_portal.ciip_user_organisation;
  $$,
  ARRAY[999],
  'Industry user cannot select a row in ciip_user_organisation if the user_id column does not match their user id'
);

select throws_like(
  $$
    insert into ggircs_portal.ciip_user_organisation (user_id, organisation_id, status)
    values (888, 888, 'approved')
  $$,
  '%violates row-level security%',
  'Industry user cannot create a row in ciip_user_organisation with a status of approved'
);

select throws_like(
  $$
    insert into ggircs_portal.ciip_user_organisation (user_id, organisation_id, status)
    values (888, 1, 'pending')
  $$,
  '%violates row-level security%',
  'Industry user cannot create a row in ciip_user_organisation with any user_id but their own'
);

-- CIIP ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.ciip_user_organisation
  $$,
  ARRAY[5::bigint],
  'Analyst can select all from table ciip_user_organisation'
);

select lives_ok(
  $$
    insert into ggircs_portal.ciip_user_organisation (user_id, organisation_id)
    values (999, 777);
  $$,
    'Analyst can insert data in ciip_user_organisation table'
);

select lives_ok(
  $$
    update ggircs_portal.ciip_user_organisation set status = 'rejected' where user_id=999 and organisation_id=777
  $$,
    'Analyst can change data in ciip_user_organisation table'
);

select results_eq(
  $$
    select count(id) from ggircs_portal.ciip_user_organisation where user_id = 999 and organisation_id = 777 and status = 'rejected'
  $$,
    ARRAY[1::bigint],
    'Data was changed by Analyst'
);

select throws_like(
  $$
    delete from ggircs_portal.ciip_user_organisation
  $$,
  'permission denied%',
    'Analyst cannot update table ciip_user_organisation'
);

select finish();
rollback;
