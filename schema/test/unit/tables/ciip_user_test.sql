set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(11);

create role test_superuser superuser;

-- Table exists
select has_table(
  'ggircs_portal', 'ciip_user',
  'ggircs_portal.ciip_user should exist, and be a table'
);
-- select * from ggircs_portal.ciip_user;
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';

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

set role ciip_industry_user;
select concat('current user is: ', (select current_user));

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

select finish();
rollback;
