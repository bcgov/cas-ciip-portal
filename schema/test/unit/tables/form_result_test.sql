set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(22);

select has_table(
    'ggircs_portal', 'form_result',
    'ggircs_portal.form_result should exist, and be a table'
);

-- Row level security tests --

-- Test setup
create role test_superuser superuser;
set jwt.claims.sub to '11111111-1111-1111-1111-111111111111';
alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.ciip_user disable trigger _welcome_email;

-- User 999 has access to form_result 999, but not form_result 1000
insert into ggircs_portal.ciip_user(id, uuid) overriding system value
values (999, '11111111-1111-1111-1111-111111111111'), (1000, '22222222-2222-2222-2222-222222222222');
insert into ggircs_portal.organisation(id) overriding system value values(999), (1000);
insert into ggircs_portal.facility(id, organisation_id) overriding system value values(999, 999), (1000, 1000);
insert into ggircs_portal.application(id, facility_id) overriding system value values(999, 999), (1000, 1000);
insert into ggircs_portal.application_revision(application_id, version_number) overriding system value values(999, 1), (999, 2), (1000, 1), (1000,2), (1000,3);
insert into ggircs_portal.ciip_user_organisation(id, user_id, organisation_id) overriding system value values(999, 999, 999), (1000, 1000, 1000);
insert into ggircs_portal.form_result(id, form_id, application_id, version_number, form_result) overriding system value
  values (999, 1, 999, 1, '{}'), (1000, 1, 1000, 1, '{}');

insert into ggircs_portal.ciip_user(id, uuid, email_address) overriding system value
  values (1001, '33333333-3333-3333-3333-333333333333', 'certifier@test.test');
insert into ggircs_portal.certification_url(id, application_id, version_number, certifier_email) overriding system value
  values('999', 999, 1, 'certifier@test.test');



-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.form_result where id = 999 or id=1000
  $$,
  ARRAY[2::bigint],
    'ciip_administrator can view all data in form_result table'
);

select throws_like(
  $$
    insert into ggircs_portal.form_result (id, form_id, application_id, version_number, form_result) overriding system value
    values (1001, 2, 1000, 2, '{}');
  $$,
  'permission denied%',
  'ciip_administrator cannot insert data in form_result table'
);

select throws_like(
  $$
    update ggircs_portal.form_result set form_id = 3 where id=1000;
  $$,
  'permission denied%',
  'ciip_administrator cannot change data in form_result table'
);

select throws_like(
  $$
    delete from ggircs_portal.form_result where id=1001
  $$,
  'permission denied%',
    'Administrator cannot delete rows from table_form_result'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select id from ggircs_portal.form_result
  $$,
  ARRAY[999::integer],
    'Industry user can view data from form_result where the connection application -> facility -> ciip_user_organisation -> user exists on user.uuid = session.sub'
);

select is_empty(
  $$
    select id from ggircs_portal.form_result where id = 1000;
  $$,
  'Industry user cannot view form_results that are not connected by application -> facility -> ciip_user_organisation -> user -> user.uuid = session.sub'
);

select lives_ok(
  $$
    insert into ggircs_portal.form_result (id, form_id, application_id, version_number, form_result) overriding system value
    values (1002, 1, 999, 2, '{}');
  $$,
    'Industry user can create a form_result if the applications id is in the connection application -> facility -> ciip_user_organisation -> user '
);

select results_eq(
  $$
    select id from ggircs_portal.form_result where id=1002
  $$,
  ARRAY[1002::integer],
    'Industry user created a form_result'
);

select throws_like(
  $$
    insert into ggircs_portal.form_result (id, form_id, application_id, version_number, form_result) overriding system value
    values (1003, 1, 1000, 1, '{}');
  $$,
  'new row violates%',
    'Industry User cannot create a row in ggircs_portal.form_result when not connected by application -> facility -> ciip_user_organisation -> user -> user.uuid = session.sub'
);

select lives_ok(
  $$
    update ggircs_portal.form_result set form_result = '{"abc":"123"}' where id=1002;
  $$,
    'Industry user can update a form_result if the applications id is in the connection application -> facility -> ciip_user_organisation -> user '
);

select results_eq(
  $$
    select id from ggircs_portal.form_result where id=1002 and form_result='{"abc":"123"}'
  $$,
  ARRAY[1002::integer],
    'Industry user updated a form_result'
);

select throws_like(
  $$
    delete from ggircs_portal.application where id=999
  $$,
  'permission denied%',
    'Industry User cannot delete rows from table_form_result'
);

-- attempt to update a row that user does not have access to
update ggircs_portal.form_result set form_result = '{"abc":"123"}' where id=1000;
set role test_superuser;
select is_empty(
  $$
    select * from ggircs_portal.form_result where form_result = '{"abc":"123"}' and id=1000;
  $$,
  'Data was not updated by Industry user'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.form_result where id = 999 or id=1000;
  $$,
  ARRAY[2::bigint],
  'Analyst can select all from table form_result'
);

select throws_like(
  $$
    insert into ggircs_portal.form_result (id, form_id, application_id, version_number, form_result) overriding system value
    values (1002, 1, 1000, 1, '{}');
  $$,
  'permission denied%',
    'Analyst cannot insert into table form_result'
);

select throws_like(
  $$
    update ggircs_portal.form_result set form_id = 2 where id=1000;
  $$,
  'permission denied%',
    'Analyst cannot update table form_result'
);

select throws_like(
  $$
    delete from ggircs_portal.application where id = 999;
  $$,
  'permission denied%',
    'Analyst cannot delete rows from table form_result'
);

-- CIIP_INDUSTRY_USER (Certifier)
set role ciip_industry_user;
set jwt.claims.sub to '33333333-3333-3333-3333-333333333333';

select results_eq(
  $$
    select distinct application_id from ggircs_portal.form_result
  $$,
  ARRAY[999::integer],
    'Certifier can view data from form_result where the current users certifier_email on certification_url maps to an application'
);

select throws_like(
  $$
    insert into ggircs_portal.form_result (id, form_id, application_id, version_number, form_result) overriding system value
    values (1002, 1, 999, 1, '{}');
  $$,
  'new row violates%',
    'Certifier cannot create a row in ggircs_portal.form_result'
);

update ggircs_portal.form_result set form_id = 2 where id=999 and form_id=1;
select results_eq(
  $$
    select form_id from ggircs_portal.form_result where id=999 and form_id=1;
  $$,
  ARRAY['1'::int],
    'Certifier cannot update table form_result'
);

select throws_like(
  $$
    delete from ggircs_portal.application where id = 999;
  $$,
  'permission denied%',
    'Certfier cannot delete rows from table form_result'
);

select finish();
rollback;
