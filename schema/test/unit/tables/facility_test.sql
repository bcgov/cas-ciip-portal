set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(18);

create role test_superuser superuser;

-- Table exists
select has_table(
  'ggircs_portal', 'facility',
  'ggircs_portal.facility should exist, and be a table'
);

-- Row level security tests --

-- Test setup
alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.ciip_user disable trigger graphile_worker_job;

insert into ggircs_portal.ciip_user(id, uuid, first_name)
overriding system value
values (999, '11111111-1111-1111-1111-111111111111'::uuid, 'test_user');

insert into ggircs_portal.organisation(id, operator_name)
overriding system value
values (999, 'test_org1');

insert into ggircs_portal.organisation(id, operator_name)
overriding system value
values (1000, 'test_org2');

insert into ggircs_portal.facility(id, organisation_id, facility_name)
overriding system value
values (999, 999, 'test_fac1');

insert into ggircs_portal.facility(id, organisation_id, facility_name)
overriding system value
values (1000, 1000, 'test_fac2');

insert into ggircs_portal.ciip_user_organisation(id, user_id, organisation_id, status)
overriding system value
values(999, 999, 999, 'approved');

set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.facility where id=999 or id=1000;
  $$,
  ARRAY[2::bigint],
    'ciip_administrator can view all data in facility table'
);

select lives_ok(
  $$
    insert into ggircs_portal.facility (organisation_id, facility_name)
    values (1000, 'admin added');
  $$,
    'ciip_administrator can insert data in facility table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.facility where facility_name='admin added';
  $$,
  ARRAY[1::bigint],
    'data was inserted by ciip_administrator'
);

select lives_ok(
  $$
    update ggircs_portal.facility set facility_name = 'admin changed' where facility_name='admin added';
  $$,
    'ciip_administrator can change data in facility table'
);

select results_eq(
  $$
    select count(id) from ggircs_portal.facility where facility_name='admin changed';
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.facility where facility_name='admin changed';
  $$,
  'permission denied%',
  'ciip_administrator cannot delete data in facility table'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.facility where id=999 or id=1000;
  $$,
  ARRAY[1::bigint],
    'ciip_industry_user can data in facility table if the connection facility -> organisation -> ciip_user_organisation -> ciip_user exists'
);

select lives_ok(
  $$
    insert into ggircs_portal.facility (organisation_id, facility_name)
    values (999, 'user added');
  $$,
    'ciip_industry_user can insert data in facility table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.facility where facility_name='user added';
  $$,
  ARRAY[1::bigint],
    'data was inserted by ciip_industry_user'
);

select throws_like(
  $$
    update ggircs_portal.facility set facility_name='I cant do this' where facility_name='user added';
  $$,
  'permission denied%',
  'ciip_industry_user cannot update data in facility table'
);

select throws_like(
  $$
    delete from ggircs_portal.facility where facility_name='user added';
  $$,
  'permission denied%',
  'ciip_industry_user cannot delete data in facility table'
);

-- CIIP ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.facility where id=999 or id=1000;
  $$,
  ARRAY[2::bigint],
    'ciip_analyst can view all data in facility table'
);

select lives_ok(
  $$
    insert into ggircs_portal.facility (organisation_id, facility_name)
    values (1000, 'analyst added');
  $$,
    'ciip_analyst can insert data in facility table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.facility where facility_name='analyst added';
  $$,
  ARRAY[1::bigint],
    'data was inserted by ciip_analyst'
);

select lives_ok(
  $$
    update ggircs_portal.facility set facility_name = 'analyst changed' where facility_name='analyst added';
  $$,
    'ciip_analyst can change data in facility table'
);

select results_eq(
  $$
    select count(id) from ggircs_portal.facility where facility_name='analyst changed';
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_analyst'
);

select throws_like(
  $$
    delete from ggircs_portal.facility where facility_name='analyst changed';
  $$,
  'permission denied%',
  'ciip_analyst cannot delete data in facility table'
);

select finish();
rollback;
