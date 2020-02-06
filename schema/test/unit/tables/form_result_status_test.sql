set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(18);

select has_table(
    'ggircs_portal', 'form_result_status',
    'ggircs_portal.form_result_status should exist, and be a table'
);

-- Row level security tests --

-- Test setup
create role test_superuser superuser;
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';
alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;

-- User 999 has access to form_result_status 999, but not form_result_status 1000
insert into ggircs_portal.ciip_user(id, uuid) overriding system value
values (999, '11111111-1111-1111-1111-111111111111'), (1000, '22222222-2222-2222-2222-222222222222');
insert into ggircs_portal.organisation(id) overriding system value values(999), (1000);
insert into ggircs_portal.facility(id, organisation_id) overriding system value values(999, 999), (1000, 1000);
insert into ggircs_portal.application(id, facility_id) overriding system value values(999, 999), (1000, 1000);
insert into ggircs_portal.application_revision(application_id, version_number) overriding system value values(999, 1), (999, 2), (1000, 1), (1000,2), (1000,3);
insert into ggircs_portal.ciip_user_organisation(id, user_id, organisation_id) overriding system value values(999, 999, 999), (1000, 1000, 1000);
insert into ggircs_portal.form_result(id, form_id, application_id, version_number, form_result) overriding system value
  values (999, 1, 999, 1, '{}'), (1000, 1, 1000, 1, '{}');
insert into ggircs_portal.form_result_status(id, application_id, form_id, form_result_status) overriding system value
  values (999, 999, 1, 'in review'), (1000, 1000, 1, 'in review');


-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.form_result_status where id = 999 or id=1000
  $$,
  ARRAY[2::bigint],
    'ciip_administrator can view all data in form_result_status table'
);

select lives_ok(
  $$
    insert into ggircs_portal.form_result_status (id, application_id, form_id, form_result_status) overriding system value
    values (1001, 1000, 1, 'approved');
  $$,
    'ciip_administrator can insert data in form_result_status table'
);

select results_eq(
  $$
    select count(id) from ggircs_portal.form_result_status where id=1001;
  $$,
    ARRAY[1::bigint],
    'Data was inserted by ciip_administrator'
);

select throws_like(
  $$
    update ggircs_portal.form_result_status set form_id = 3 where id=1001;
  $$,
  'permission denied%',
    'Administrator cannot update rows in form_result_status table'
);

select throws_like(
  $$
    delete from ggircs_portal.form_result_status where id=1001
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_application'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select id from ggircs_portal.form_result_status
  $$,
  ARRAY[999::integer],
    'Industry user can view data from form_result_status where the connection application -> facility -> ciip_user_organisation -> user exists on user.uuid = session.sub'
);

select is_empty(
  $$
    select id from ggircs_portal.form_result_status where id = 1000;
  $$,
  'Industry user cannot view form_results that are not connected by application -> facility -> ciip_user_organisation -> user -> user.uuid = session.sub'
);

select lives_ok(
  $$
    insert into ggircs_portal.form_result_status (id, application_id, form_id, form_result_status) overriding system value
    values (1002, 999, 1, 'in review');
  $$,
    'Industry user can create a form_result_status if the applications id is in the connection application -> facility -> ciip_user_organisation -> user '
);

select results_eq(
  $$
    select id from ggircs_portal.form_result_status where id=1002
  $$,
  ARRAY[1002::integer],
    'Industry user created a form_result_status'
);

select throws_like(
  $$
    insert into ggircs_portal.form_result_status (id, application_id, form_id, form_result_status) overriding system value
    values (1003, 1000, 1, 'in review');
  $$,
  'new row violates%',
    'Industry User cannot create a row in ggircs_portal.form_result_status when not connected by application -> facility -> ciip_user_organisation -> user -> user.uuid = session.sub'
);

select throws_like(
  $$
    update ggircs_portal.form_result_status set form_result_status = 'approved' where id=1002;
  $$,
  'permission denied%',
    'Industry User cannot update form_result_status table'
);

select throws_like(
  $$
    delete from ggircs_portal.application where id=999
  $$,
  'permission denied%',
    'Industry User cannot delete rows from form_result_status_table'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.form_result_status where id = 999 or id=1000
  $$,
  ARRAY[2::bigint],
    'ciip_analyst can view all data in form_result_status table'
);

select lives_ok(
  $$
    insert into ggircs_portal.form_result_status (id, application_id, form_id, form_result_status) overriding system value
    values (1003, 1000, 1, 'approved');
  $$,
    'ciip_analyst can insert data in form_result_status table'
);

select results_eq(
  $$
    select count(id) from ggircs_portal.form_result_status where id=1003;
  $$,
    ARRAY[1::bigint],
    'Data was inserted by ciip_analyst'
);

select throws_like(
  $$
    update ggircs_portal.form_result_status set form_id = 3 where id=1003;
  $$,
  'permission denied%',
    'Analyst cannot update rows in form_result_status table'
);

select throws_like(
  $$
    delete from ggircs_portal.form_result_status where id=1003
  $$,
  'permission denied%',
    'Analyst cannot delete rows from form_result_status table'
);

select finish();
rollback;
