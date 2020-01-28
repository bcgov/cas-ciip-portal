set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(8);

-- Table exists
select has_table(
  'ggircs_portal', 'ciip_user',
  'ggircs_portal.ciip_user should exist, and be a table'
);
-- select * from ggircs_portal.ciip_user;
set jwt.claims.sub to '00000000-0000-0000-0000-000000000000';

select 'COUNT SUPERUSER', count(id) from ggircs_portal.ciip_user;

set role administrator;
select 'COUNT ADMIN', count(id) from ggircs_portal.ciip_user;
insert into ggircs_portal.ciip_user (uuid, first_name, last_name) values ('00000000-0000-0000-0000-000000000000', 'dylan', 'leard');
select current_user;

select lives_ok(
  $$
    select * from ggircs_portal.ciip_user
  $$,
    'Administrator can view all data in ciip_user table'
);

select lives_ok(
  $$
    update ggircs_portal.ciip_user set first_name = 'changed by admin' where uuid='00000000-0000-0000-0000-000000000000'::uuid;
  $$,
    'Administrator can change data in ciip_user table'
);

select results_eq(
  $$
    select count(uuid) from ggircs_portal.ciip_user where first_name = 'changed by admin'
  $$,
    ARRAY[1::bigint],
    'Administrator can change data in ciip_user table'
);

select throws_like(
  $$
    update ggircs_portal.ciip_user set uuid = 'ca716545-a8d3-4034-819c-5e45b0e775c9' where uuid != '00000000-0000-0000-0000-000000000000'::uuid;
  $$,
    'permission denied%',
    'Administrator can not change data in the uuid column in ciip_user table'
);


set role industry_user;
select * from ggircs_portal.ciip_user;
select '+++++++++++++++++++++++++++++++++++++++';
select uuid from ggircs_portal.ciip_user where uuid='00000000-0000-0000-0000-000000000000'::uuid;

select current_user;
select lives_ok(
  $$
    select * from ggircs_portal.ciip_user
  $$,
    'Industry user can view data from ciip_user'
);

select lives_ok(
  $$
    update ggircs_portal.ciip_user set first_name = 'doood' where uuid='00000000-0000-0000-0000-000000000000'::uuid
  $$,
    'Industry user can update data if their uuid matches the uuid of the row'
);

select throws_like(
  $$
    update ggircs_portal.ciip_user set first_name = 'doood' where uuid='ca716545-a8d3-4034-819c-5e45b0e775c9'::uuid
  $$,
  'permission denied%',
    'Industry user cannot update data if their uuid does not match the uuid of the row'
);

select finish();
rollback;
