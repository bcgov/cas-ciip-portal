set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(25);

create role test_superuser superuser;

alter table ggircs_portal.ciip_user_organisation disable trigger _send_request_for_access_email;
alter table ggircs_portal.ciip_user_organisation disable trigger _send_access_approved_email;
alter table ggircs_portal.ciip_user_organisation disable trigger _set_user_id;
update ggircs_portal.ciip_user set allow_uuid_update=true where id=3 or id=2;
update ggircs_portal.ciip_user set uuid = '11111111-1111-1111-1111-111111111111@idir' where id = 2;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values
(1,1,'approved'),
(4,8,'approved');
update ggircs_portal.ciip_user_organisation set status = 'rejected' where user_id=3 and organisation_id=8;

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
    insert into ggircs_portal.ciip_user (uuid, first_name, last_name) values ('11111111-1111-1111-1111-111111111111', 'test', 'testerson');
  $$,
    'ciip_administrator can insert data in ciip_user table'
);

select lives_ok(
  $$
    update ggircs_portal.ciip_user set first_name = 'changed by admin' where uuid='11111111-1111-1111-1111-111111111111';
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
    update ggircs_portal.ciip_user set uuid = 'ca716545-a8d3-4034-819c-5e45b0e775c9' where uuid = '11111111-1111-1111-1111-111111111111';
  $$,
   'permission denied for table ciip_user',
    'ciip_administrator can not change data in the uuid column in ciip_user table'
);

select throws_like(
  $$
    delete from ggircs_portal.ciip_user where id=1
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_ciip_user'
);

select user_id from ggircs_portal.ciip_user_organisation where organisation_id=7;
select * from ggircs_portal.ciip_user_organisation;

-- CIIP_INDUSTRY_USER
set jwt.claims.sub to '00000000-0000-0000-0000-000000000000';
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select id from ggircs_portal.ciip_user;

select isnt_empty(
  $$
    select * from ggircs_portal.ciip_user where id = 6;
  $$,
    'Industry user can view data from ciip_user table for users within the same approved organisation'
);

select isnt_empty(
  $$
    select * from ggircs_portal.ciip_user where id = 2;
  $$,
    'Industry user can view data from ciip_user table for CAS users (uuid ends in @idir)'
);

select is_empty(
  $$
    select * from ggircs_portal.ciip_user where id = 1;
  $$,
    'Industry user cannot view data from ciip_user table for users that are not approved for the same organisation'
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
    update ggircs_portal.ciip_user set uuid = 'ca716545-a8d3-4034-819c-5e45b0e775c9' where uuid = (select sub from ggircs_portal.session())
  $$,
  'permission denied for table ciip_user',
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
    update ggircs_portal.ciip_user set uuid = 'ca716545-a8d3-4034-819c-5e45b0e775c9' where uuid=(select sub from ggircs_portal.session())
  $$,
  'permission denied for table ciip_user',
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
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';
set role ciip_guest;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select uuid from ggircs_portal.ciip_user
  $$,
  ARRAY['11111111-1111-1111-1111-111111111111'::varchar],
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
    insert into ggircs_portal.ciip_user (uuid, first_name, last_name) values ('21111111-1111-1111-1111-111111111111', 'test', 'testerson');
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
