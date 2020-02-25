set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(15);

-- Table exists
select has_table(
  'ggircs_portal', 'certification_url',
  'ggircs_portal.certification_url should exist, and be a table'
);

-- Row level security tests --

-- Test setup
create role test_superuser superuser;
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';
alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.certification_url
  disable trigger _random_id;
alter table ggircs_portal.ciip_user disable trigger graphile_worker_job;

-- User 999 has access to certification_url 999, but not certification_url 1000
insert into ggircs_portal.ciip_user(id, uuid) overriding system value
values (999, '11111111-1111-1111-1111-111111111111'), (1000, '22222222-2222-2222-2222-222222222222');
insert into ggircs_portal.organisation(id) overriding system value values(999), (1000);
insert into ggircs_portal.facility(id, organisation_id) overriding system value values(999, 999), (1000, 1000);
insert into ggircs_portal.application(id, facility_id) overriding system value values(999, 999), (1000, 1000);
insert into ggircs_portal.ciip_user_organisation(id, user_id, organisation_id) overriding system value values(999, 999, 999), (1000, 1000, 1000);
insert into ggircs_portal.certification_url(id, application_id) overriding system value values('999', 999), ('1000', 1);

select * from ggircs_portal.certification_url;

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.certification_url where id = '999' or id='1000'
  $$,
  ARRAY[2::bigint],
    'ciip_administrator can view all data in certification_url table'
);

select lives_ok(
  $$
    insert into ggircs_portal.certification_url (id, application_id) overriding system value
    values ('1001', 1);
  $$,
    'ciip_administrator can insert data in certification_url table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.certification_url where id='1001';
  $$,
    ARRAY[1::bigint],
    'Data was created by ciip_administrator'
);

select throws_like(
  $$
    update ggircs_portal.certification_url set application_id=2 where id='1001';
  $$,
  'permission denied%',
    'Administrator cannot update rows in table_certification_url'
);

select throws_like(
  $$
    delete from ggircs_portal.certification_url where id='1001'
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_certification_url'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select id from ggircs_portal.certification_url;
  $$,
  ARRAY['999'::character varying(1000)],
    'Industry user can view data in certification_url table if the connection application -> facility -> user_organisation -> user exists'
);

select lives_ok(
  $$
    insert into ggircs_portal.certification_url (id, application_id) overriding system value
    values ('1002', 999);
  $$,
    'Industry user can insert data in certification_url table'
);

select results_eq(
  $$
    select count(*) from ggircs_portal.certification_url where id='1002';
  $$,
    ARRAY[1::bigint],
    'Data was created by Industry user'
);

select throws_like(
  $$
    update ggircs_portal.certification_url set application_id=2 where id='999';
  $$,
  'permission denied%',
    'Administrator cannot update rows in table_certification_url'
);

select throws_like(
  $$
    delete from ggircs_portal.certification_url where application_id='999'
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_certification_url'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.certification_url where id = '999' or id='1000';
  $$,
  ARRAY[2::bigint],
  'Analyst can select all from table certification_url'
);

select throws_like(
  $$
    update ggircs_portal.certification_url set application_id=2 where id='999';
  $$,
  'permission denied%',
    'Analyst cannot update table certification_url'
);

select throws_like(
  $$
    insert into ggircs_portal.certification_url(id, application_id) values ('1003',1);
  $$,
  'permission denied%',
    'Analyst cannot insert into table certification_url'
);

select throws_like(
  $$
    delete from ggircs_portal.certification_url where id = '999';
  $$,
  'permission denied%',
    'Analyst cannot delete rows from table certification_url'
);

select finish();
rollback;
