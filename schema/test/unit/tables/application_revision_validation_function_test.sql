set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(14);

-- Table exists
select has_table(
  'ggircs_portal', 'application_revision_validation_function',
  'ggircs_portal.application_revision_validation_function should exist, and be a table'
);

select has_index(
  'ggircs_portal', 'application_revision_validation_function', 'ggircs_portal_app_validation_function_name',
  'application_revision_validation_function table has a unique index on the validation_function_name column'
);

-- Test Setup
select test_helper.clean_ggircs_portal_schema();
insert into ggircs_portal.application_revision_validation_function(validation_function_name, validation_description, validation_failed_message) values ('test func', 'test desc', 'test failed');

-- Row level security tests --

-- CIIP_ADMINISTRATOR
set role ciip_administrator;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select validation_function_name from ggircs_portal.application_revision_validation_function;
  $$,
  ARRAY['test func'::varchar(1000)],
    'ciip_administrator can select data from the application_revision_validation_function table'
);

select throws_like(
  $$
    update ggircs_portal.application_revision_validation_function set validation_function_name='changed';
  $$,
  'permission denied%',
    'Administrator cannot update rows in the application_revision_validation_function table'
);

select throws_like(
  $$
    insert into ggircs_portal.application_revision_validation_function(validation_function_name, validation_description, validation_failed_message)
    values ('inserted', 'by', 'admin');
  $$,
  'permission denied%',
    'Administrator cannot update rows in the application_revision_validation_function table'
);

select throws_like(
  $$
    delete from ggircs_portal.application_revision_validation_function;
  $$,
  'permission denied%',
    'Administrator cannot delete rows from the application_revision_validation_function table'
);

-- CIIP_INDUSTRY_USER
set role ciip_industry_user;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select validation_function_name from ggircs_portal.application_revision_validation_function;
  $$,
  ARRAY['test func'::varchar(1000)],
    'ciip_industry_user can select data from the application_revision_validation_function table'
);

select throws_like(
  $$
    update ggircs_portal.application_revision_validation_function set validation_function_name='changed';
  $$,
  'permission denied%',
    'ciip_industry_user cannot update rows in the application_revision_validation_function table'
);

select throws_like(
  $$
    insert into ggircs_portal.application_revision_validation_function(validation_function_name, validation_description, validation_failed_message)
    values ('inserted', 'by', 'user');
  $$,
  'permission denied%',
    'ciip_industry_user cannot update rows in the application_revision_validation_function table'
);

select throws_like(
  $$
    delete from ggircs_portal.application_revision_validation_function;
  $$,
  'permission denied%',
    'Industry User cannot delete rows from the application_revision_validation_function table'
);

-- CIIP_ANALYST
set role ciip_analyst;
select concat('current user is: ', (select current_user));

select results_eq(
  $$
    select validation_function_name from ggircs_portal.application_revision_validation_function;
  $$,
  ARRAY['test func'::varchar(1000)],
    'Analyst can select data from the application_revision_validation_function table'
);

select throws_like(
  $$
    update ggircs_portal.application_revision_validation_function set validation_function_name='changed';
  $$,
  'permission denied%',
    'Analyst cannot update rows in the application_revision_validation_function table'
);

select throws_like(
  $$
    insert into ggircs_portal.application_revision_validation_function(validation_function_name, validation_description, validation_failed_message)
    values ('inserted', 'by', 'user');
  $$,
  'permission denied%',
    'Analyst cannot update rows in the application_revision_validation_function table'
);

select throws_like(
  $$
    delete from ggircs_portal.application_revision_validation_function;
  $$,
  'permission denied%',
    'Analyst cannot delete rows from the application_revision_validation_function table'
);

select finish();
rollback;
