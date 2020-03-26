set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(23);

create role test_superuser superuser;

-- Table exists
select has_table(
  'ggircs_portal', 'ciip_user',
  'ggircs_portal.ciip_user should exist, and be a table'
);


-- Row level security tests --

-- Test setup
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';
alter table ggircs_portal.ciip_user disable trigger _welcome_email;

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select lives_ok(
  $$
    select * from ggircs_portal.ciip_user
  $$,
    'ciip_administrator can view all data in ciip_user table'
);

select lives_ok(
  $$
    insert into ggircs_portal.ciip_user (uuid, first_name, last_name) values ('11111111-1111-1111-1111-111111111111'::uuid, 'test', 'testerson');
  $$,
    'ciip_administrator can insert data in ciip_user table'
);

select lives_ok(
  $$
    update ggircs_portal.ciip_user set first_name = 'changed by admin' where uuid='11111111-1111-1111-1111-111111111111'::uuid;
  $$,
    'ciip_administrator can change data in ciip_user table'
);

select results_eq(
  $$
    select count(uuid) from ggircs_portal.ciip_user where first_name = 'changed by admin'
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    update ggircs_portal.ciip_user set uuid = 'ca716545-a8d3-4034-819c-5e45b0e775c9' where uuid = '11111111-1111-1111-1111-111111111111'::uuid;
  $$,
    'permission denied%',
    'ciip_administrator can not change data in the uuid column in ciip_user table'
);

select throws_like(
  $$
    delete from ggircs_portal.ciip_user where id=1
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_ciip_user'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select uuid from ggircs_portal.ciip_user
  $$,
  ARRAY['11111111-1111-1111-1111-111111111111'::uuid],
    'Industry user can view data from ciip_user where the uuid column matches their session uuid'
);

select lives_ok(
  $$
    update ggircs_portal.ciip_user set first_name = 'doood' where uuid=(select sub from ggircs_portal.session())
  $$,
    'Industry user can update data if their uuid matches the uuid of the row'
);

select results_eq(
  $$
    select first_name from ggircs_portal.ciip_user where uuid=(select sub from ggircs_portal.session())
  $$,
  ARRAY['doood'::varchar(1000)],
    'Data was changed by Industry User'
);

select throws_like(
  $$
    update ggircs_portal.ciip_user set uuid = 'ca716545-a8d3-4034-819c-5e45b0e775c9' where uuid!=(select sub from ggircs_portal.session())
  $$,
  'permission denied%',
    'Industry user cannot update their uuid'
);

select throws_like(
  $$
    delete from ggircs_portal.ciip_user where id=1
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_ciip_user'
);

-- Try to update ciip user data where
update ggircs_portal.ciip_user set first_name = 'buddy' where uuid!=(select sub from ggircs_portal.session());

set role test_superuser;
select concat('current user is: ', (select current_user));

select is_empty(
  $$
    select * from ggircs_portal.ciip_user where first_name='buddy'
  $$,
    'Industry user cannot update data if their uuid does not match the uuid of the row'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.ciip_user
  $$,
  ARRAY['7'::bigint],
    'Analyst can view all data from ciip_user'
);

select lives_ok(
  $$
    update ggircs_portal.ciip_user set first_name = 'buddy' where uuid=(select sub from ggircs_portal.session())
  $$,
    'Analyst can update data if their uuid matches the uuid of the row'
);

select results_eq(
  $$
    select first_name from ggircs_portal.ciip_user where uuid=(select sub from ggircs_portal.session())
  $$,
  ARRAY['buddy'::varchar(1000)],
    'Data was changed by Analyst'
);

select throws_like(
  $$
    update ggircs_portal.ciip_user set uuid = 'ca716545-a8d3-4034-819c-5e45b0e775c9' where uuid!=(select sub from ggircs_portal.session())
  $$,
  'permission denied%',
    'Analyst cannot update their uuid'
);

select throws_like(
  $$
    delete from ggircs_portal.ciip_user where id=1
  $$,
  'permission denied%',
    'Analyst cannot delete rows from table_ciip_user'
);

-- Try to update ciip user data where
update ggircs_portal.ciip_user set first_name = 'wolverine' where uuid!=(select sub from ggircs_portal.session());

set role test_superuser;
select concat('current user is: ', (select current_user));

select is_empty(
  $$
    select * from ggircs_portal.ciip_user where first_name='wolverine'
  $$,
    'Analyst cannot update data if their uuid does not match the uuid of the row'
);

-- CIIP_GUEST
set role ciip_guest;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select uuid from ggircs_portal.ciip_user
  $$,
  ARRAY['11111111-1111-1111-1111-111111111111'::uuid],
    'Guest can only select their own user'
);

select throws_like(
  $$
    update ggircs_portal.ciip_user set uuid = 'ca716545-a8d3-4034-819c-5e45b0e775c9' where uuid!=(select sub from ggircs_portal.session())
  $$,
  'permission denied%',
    'Guest cannot update their uuid'
);

select throws_like(
  $$
    insert into ggircs_portal.ciip_user (uuid, first_name, last_name) values ('21111111-1111-1111-1111-111111111111'::uuid, 'test', 'testerson');
  $$,
  'permission denied%',
  'Guest cannot insert'
);

select throws_like(
  $$
    delete from ggircs_portal.ciip_user where id=1
  $$,
  'permission denied%',
    'Analyst cannot delete rows from table_ciip_user'
);

select finish();
rollback;
