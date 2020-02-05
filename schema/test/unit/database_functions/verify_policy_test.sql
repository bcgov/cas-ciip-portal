set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;
select plan(11);

create table ggircs_portal.test_table
(
  id integer primary key generated always as identity
);

create role test_role;

select has_function(
  'ggircs_portal', 'verify_policy',
  'Function verify_grant should exist'
);

grant all on table ggircs_portal.test_table to test_role;

create policy select_test on ggircs_portal.test_table
  for select to test_role using (true);
create policy insert_test on ggircs_portal.test_table
  for insert to test_role with check (true);
create policy update_test on ggircs_portal.test_table
  for update to test_role using (true) with check(true);
create policy delete_test on ggircs_portal.test_table
  for delete to test_role using (true);
create policy all_test on ggircs_portal.test_table
  for all to test_role using(true);

-- Passes when should pass

select lives_ok(
  $$
    select ggircs_portal.verify_policy('select', 'select_test', 'test_table', 'test_role');
  $$,
  'verify_policy passes when select_test policy exists for user test_role '
);

select lives_ok(
  $$
    select ggircs_portal.verify_policy('insert', 'insert_test', 'test_table', 'test_role');
  $$,
  'verify_policy passes when insert_test policy exists for user test_role '
);

select lives_ok(
  $$
    select ggircs_portal.verify_policy('update', 'update_test', 'test_table', 'test_role');
  $$,
  'verify_policy passes when update_test policy exists for user test_role '
);

select lives_ok(
  $$
    select ggircs_portal.verify_policy('delete', 'delete_test', 'test_table', 'test_role');
  $$,
  'verify_policy passes when delete_test policy exists for user test_role '
);

select lives_ok(
  $$
    select ggircs_portal.verify_policy('all', 'all_test', 'test_table', 'test_role');
  $$,
  'verify_policy passes when all_test policy exists for user test_role '
);

-- Throws when should throw

select throws_ok(
  $$
    select ggircs_portal.verify_policy('bubbles', 'select_test', 'test_table', 'test_role');
  $$,
  'P0001',
  'invalid operation variable. Must be one of [select, insert, update, delete, all]',
  'Function verify_policy throws an exception if the operation variable is not in (select, insert, update, delete, all)'
);

select throws_ok(
  $$
    select ggircs_portal.verify_policy('insert', 'select_test', 'test_table', 'test_role');
  $$,
  'P0001',
  'Policy select_test on operation insert on table test_table for role test_role does not exist',
  'Function verify_policy throws if operation does not exist in policy'
);

select throws_ok(
  $$
    select ggircs_portal.verify_policy('select', 'bubbles', 'test_table', 'test_role');
  $$,
  'P0001',
  'Policy bubbles on operation select on table test_table for role test_role does not exist',
  'Function verify_policy throws if policy name does not exist in policy'
);

select throws_ok(
  $$
    select ggircs_portal.verify_policy('select', 'select_test', 'not_a_table', 'test_role');
  $$,
  '42P01',
  'relation "ggircs_portal.not_a_table" does not exist',
  'Function verify_policy throws if table name does not exist in policy'
);

select throws_ok(
  $$
    select ggircs_portal.verify_policy('select', 'select_test', 'test_table', 'not_a_role');
  $$,
  'P0001',
  'Policy select_test on operation select on table test_table for role not_a_role does not exist',
  'Function verify_policy throws if role does not exist in policy'
);

select finish();
rollback;
