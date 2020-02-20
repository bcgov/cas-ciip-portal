set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(16);

-- Table exists
select has_table(
  'ggircs_portal', 'application',
  'ggircs_portal.application should exist, and be a table'
);

-- Row level security tests --

-- Test setup
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';
alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.ciip_user disable trigger graphile_worker_job;

-- User 999 has access to application 999, but not application 1000
insert into ggircs_portal.ciip_user(id, uuid) overriding system value
values (999, '11111111-1111-1111-1111-111111111111'), (1000, '22222222-2222-2222-2222-222222222222');
insert into ggircs_portal.organisation(id) overriding system value values(999), (1000);
insert into ggircs_portal.facility(id, organisation_id) overriding system value values(999, 999), (1000, 1000);
insert into ggircs_portal.application(id, facility_id) overriding system value values(999, 999), (1000, 1000);
insert into ggircs_portal.ciip_user_organisation(id, user_id, organisation_id) overriding system value values(999, 999, 999), (1000, 1000, 1000);


-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.application where id = 999 or id=1000
  $$,
  ARRAY[2::bigint],
    'ciip_administrator can view all data in application table'
);

select lives_ok(
  $$
    insert into ggircs_portal.application (id, facility_id, reporting_year) overriding system value
    values (1001, 1, 2020);
  $$,
    'ciip_administrator can insert data in application table'
);

select lives_ok(
  $$
    update ggircs_portal.application set reporting_year = 2022 where id=1001;
  $$,
    'ciip_administrator can change data in application table'
);

select results_eq(
  $$
    select count(id) from ggircs_portal.application where reporting_year = 2022 and id=1001;
  $$,
    ARRAY[1::bigint],
    'Data was changed by ciip_administrator'
);

select throws_like(
  $$
    delete from ggircs_portal.application where id=1
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_application'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select id from ggircs_portal.application
  $$,
  ARRAY[999::integer],
    'Industry user can view data from application where the connection application -> facility -> ciip_user_organisation -> user exists on user.uuid = session.sub'
);

select lives_ok(
  $$
    insert into ggircs_portal.application(facility_id) values (999);
  $$,
    'Industry user can create an application if the facility id is in the connection facility -> ciip_user_organisation -> user '
);

select throws_like(
  $$
    insert into ggircs_portal.application(facility_id) values (1000);
  $$,
  'new row violates%',
    'Industry User cannot create a row in ggircs_portal.applicaiton when not connected by application -> facility -> ciip_user_organisation -> user -> user.uuid = session.sub'
);

select is_empty(
  $$
    select id from ggircs_portal.application where id = 1000;
  $$,
  'Industry user view applications that are not connected by application -> facility -> ciip_user_organisation -> user -> user.uuid = session.sub'
);

select throws_like(
  $$
    delete from ggircs_portal.application where id=999
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_application'
);

select throws_like(
  $$
    update ggircs_portal.application set facility_id = 1 where id=999;
  $$,
  'permission denied%',
    'Industry User cannot update rows in table_application'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.application where id = 999 or id=1000;
  $$,
  ARRAY[2::bigint],
  'Analyst can select all from table application'
);

select lives_ok(
  $$
    update ggircs_portal.application set reporting_year = 2021 where id = 1000;
  $$,
  'Analyst can update table application'
);

select throws_like(
  $$
    insert into ggircs_portal.application(facility_id) values (1002);
  $$,
  'permission denied%',
    'Analyst cannot insert into table application'
);

select throws_like(
  $$
    delete from ggircs_portal.application where id = 999;
  $$,
  'permission denied%',
    'Analyst cannot delete rows from table application'
);

select finish();
rollback;
