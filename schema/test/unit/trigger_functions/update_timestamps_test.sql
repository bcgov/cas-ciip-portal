set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

select * from no_plan();

-- Init test
select test_helper.clean_ggircs_portal_schema();
select test_helper.modify_triggers('disable');
select test_helper.create_test_users();
set jwt.claims.sub to '00000000-0000-0000-0000-000000000000';

create table timestamp_compare (
  id integer primary key generated always as identity,
  old_timestamp timestamptz
);

create table test_table_all (
  id integer primary key generated always as identity,
  test_name varchar(1000),
  created_at timestamp with time zone not null default now(),
  created_by int references ggircs_portal.ciip_user,
  updated_at timestamp with time zone not null default now(),
  updated_by int references ggircs_portal.ciip_user,
  deleted_at timestamp with time zone,
  deleted_by int references ggircs_portal.ciip_user
);

create table test_table_no_trigger_columns (
  id integer primary key generated always as identity,
  test_name varchar(1000)
);

create trigger _100_timestamps
  before insert or update on test_table_all
  for each row
  execute procedure ggircs_portal_private.update_timestamps();

create trigger _100_timestamps
  before insert or update on test_table_no_trigger_columns
  for each row
  execute procedure ggircs_portal_private.update_timestamps();

select has_function(
  'ggircs_portal_private', 'update_timestamps',
  'Function update_timestamps should exist'
);

-- Sets created_at/by on insert when all columns exist
insert into test_table_all (test_name) values ('create');
select is (
  (select created_by from test_table_all where id=1),
  3,
  'trigger sets created_by on insert'
);
select isnt (
  (select created_at from test_table_all where id=1),
  null,
  'trigger sets created_at on insert'
);

-- Sets updated_at/by on update when all columns exist
insert into timestamp_compare(old_timestamp) values ((select created_at from test_table_all where id=1));
set jwt.claims.sub to 'ca716545-a8d3-4034-819c-5e45b0e775c9';
update test_table_all set test_name = 'update';
select is (
  (select updated_by from test_table_all where id=1),
  2,
  'trigger sets updated_by on update'
);
select isnt (
  (select updated_at from test_table_all where id=1),
  (select old_timestamp from timestamp_compare where id=1),
  'trigger sets updated_at on update'
);

-- Sets deleted_by on update when deleted_at is changed
set jwt.claims.sub to 'ca716545-a8d3-4034-819c-5e45b0e775c9';
update test_table_all set deleted_at=now();
select is (
  (select deleted_by from test_table_all where id=1),
  2,
  'trigger sets deleted_by on update of deleted_at column'
);

-- Trigger does not error on insert when no created_at/by columns exist
select lives_ok(
  $$ insert into test_table_no_trigger_columns(test_name) values('create_only') $$,
  'table can insert without error when no timestamp/user columns exist'
);

-- Trigger does not error on update when no updated_at/by columns exist
select lives_ok(
  $$ update test_table_no_trigger_columns set test_name='updated' $$,
  'table can update without error when no timestamp/user columns exist'
);

select * from finish();

rollback;
