set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(21);

-- Table exists
select has_table(
  'ggircs_portal', 'application_review_step',
  'ggircs_portal.application_review_step should exist, and be a table'
);

-- Keys & Indexes
select col_is_pk(
  'ggircs_portal', 'application_review_step', 'id',
  'application_review_step has an id column primary key'
);

select col_is_fk(
  'ggircs_portal', 'application_review_step', 'application_id',
  'application_review_step has foreign key application_id'
);

select col_is_fk(
  'ggircs_portal', 'application_review_step', 'review_step_id',
  'application_review_step has foreign key review_step_id'
);

select col_is_fk(
  'ggircs_portal', 'application_review_step', 'updated_by',
  'application_review_step has foreign key updated_by'
);

select has_index(
  'ggircs_portal', 'application_review_step', 'ggircs_portal_application_review_step_application_foreign_key',
  'application_review_step has an index on application_id fk'
);

select has_index(
  'ggircs_portal', 'application_review_step', 'ggircs_portal_application_review_step_review_step_foreign_key',
  'application_review_step has an index on review_step_id fk'
);

select has_index(
  'ggircs_portal', 'application_review_step', 'ggircs_portal_application_review_step_updated_by_foreign_key',
  'application_review_step has an index on updated_by fk'
);

-- Columns
select columns_are('ggircs_portal'::name, 'application_review_step'::name, array[
  'id'::name,
  'application_id'::name,
  'review_step_id'::name,
  'is_complete'::name,
  'updated_at'::name,
  'updated_by'::name
]);

-- Test Setup
select test_helper.clean_ggircs_portal_schema();
select test_helper.mock_open_window();
select test_helper.modify_triggers('disable');
select test_helper.create_test_users();
select test_helper.create_applications(2, False, True);
insert into ggircs_portal.review_step (step_name, is_active) values ('test_step1', true);
insert into ggircs_portal.review_step (step_name, is_active) values ('test_step2', false);
insert into ggircs_portal.application_review_step(application_id, review_step_id, is_complete)
  values (1,1,false);

-- Row level security tests

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.application_review_step
  $$,
  ARRAY[1::bigint],
    'ciip_administrator can view all data in the application_review_step table'
);

select lives_ok(
  $$
    insert into ggircs_portal.application_review_step(application_id, review_step_id, is_complete)
  values (1,2,false);
  $$,
    'ciip_administrator can insert data in application_review_step table'
);

select lives_ok(
  $$
    update ggircs_portal.application_review_step set is_complete = true where id=1;
  $$,
    'Administrator can update rows in application_review_step table'
);

select throws_like(
  $$
    delete from ggircs_portal.application_review_step
  $$,
  'permission denied%',
    'Administrator cannot delete rows from application_review_step table'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select count(*) from ggircs_portal.application_review_step;
  $$,
  ARRAY[2::bigint],
  'Analyst can select all from table application_review_step'
);

select lives_ok(
  $$
    insert into ggircs_portal.application_review_step(application_id, review_step_id, is_complete)
  values (2,1,false);
  $$,
    'Analyst can insert data in application_review_step table'
);

select lives_ok(
  $$
    update ggircs_portal.application_review_step set is_complete = true where id=2;
  $$,
    'Analyst can update rows in application_review_step table'
);

select throws_like(
  $$
    delete from ggircs_portal.application_review_step;
  $$,
  'permission denied%',
    'Analyst cannot delete rows from table application_review_step'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select throws_like(
  $$
    select * from ggircs_portal.application_review_step;
  $$,
  'permission denied%',
    'reporter cannot view table application_review_step'
);

select throws_like(
  $$
    insert into ggircs_portal.application_review_step(application_id, review_step_id, is_complete)
    values (2,2,false);
  $$,
  'permission denied%',
    'reporter cannot update table application_review_step'
);

select throws_like(
  $$
    update ggircs_portal.application_review_step set is_complete='false' where id=1;
  $$,
  'permission denied%',
    'reporter cannot update table application_review_step'
);

select throws_like(
  $$
    delete from ggircs_portal.application_review_step;
  $$,
  'permission denied%',
    'reporter cannot delete rows from table application_review_step'
);

select finish();
rollback;
