set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select * from no_plan();

-- Table exists
select has_table(
  'ggircs_portal', 'review_step_name',
  'ggircs_portal.review_step_name should exist, and be a table'
);

-- Keys & Indexes
select col_is_pk(
  'ggircs_portal', 'review_step_name', 'id',
  'review_step_name has an id column primary key'
);

-- Columns
select columns_are('ggircs_portal'::name, 'review_step_name'::name, array[
  'id'::name,
  'step_name'::name,
  'is_active'::name
]);

-- Test Setup
select test_helper.clean_ggircs_portal_schema();
select test_helper.mock_open_window();
select test_helper.modify_triggers('disable');
select test_helper.create_test_users();
insert into ggircs_portal.review_step_name (step_name, is_active) values ('test_step', true);

-- Row level security tests

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.review_step_name
  $$,
  ARRAY[1::bigint],
    'ciip_administrator can view all data in the review_step_name table'
);

select lives_ok(
  $$
    insert into ggircs_portal.review_step_name (step_name, is_active) values ('admin_created', true);
  $$,
    'ciip_administrator can insert data in review_step_name table'
);

select lives_ok(
  $$
    update ggircs_portal.review_step_name set step_name='admin_changed' where id=1;
  $$,
    'Administrator can update rows in review_step_name table'
);

select throws_like(
  $$
    delete from ggircs_portal.review_step_name
  $$,
  'permission denied%',
    'Administrator cannot delete rows from review_step_name table'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.review_step_name;
  $$,
  ARRAY[2::bigint],
  'Analyst can select all from table review_step_name'
);

select throws_like(
  $$
    insert into ggircs_portal.review_step_name (step_name, is_active) values ('analyst_created', true);
  $$,
  'permission denied%',
    'Analyst cannot update table review_step_name'
);

select throws_like(
  $$
    update ggircs_portal.review_step_name set step_name = 'analyst_changed' where id=1;
  $$,
  'permission denied%',
    'Analyst cannot update table review_step_name'
);

select throws_like(
  $$
    delete from ggircs_portal.review_step_name;
  $$,
  'permission denied%',
    'Analyst cannot delete rows from table review_step_name'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select throws_like(
  $$
    insert into ggircs_portal.review_step_name (step_name, is_active) values ('reporter_created', true);
  $$,
  'permission denied%',
    'reporter cannot update table review_step_name'
);

select throws_like(
  $$
    insert into ggircs_portal.review_step_name (step_name, is_active) values ('reporter_created', true);
  $$,
  'permission denied%',
    'reporter cannot update table review_step_name'
);

select throws_like(
  $$
    update ggircs_portal.review_step_name set step_name='reporter_changed' where id=1;
  $$,
  'permission denied%',
    'reporter cannot update table review_step_name'
);

select throws_like(
  $$
    delete from ggircs_portal.review_step_name;
  $$,
  'permission denied%',
    'reporter cannot delete rows from table review_step_name'
);

select finish();
rollback;
