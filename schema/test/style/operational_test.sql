set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

create schema ggircs_test_fixture;
set search_path to ggircs_test_fixture,public;
create table test_fixture
(
    id         serial,
    fname      varchar(50),
    is_deleted boolean
);
insert into test_fixture(fname, is_deleted)
values ('Dylan', 'false');


/** CREATE AUDIT SCHEMA & LOG TABLE **/
create schema audit;
revoke create on schema audit from public;

create table audit.logged_actions
(
    schema_name   text                     not null,
    table_name    text                     not null,
    user_name     text,
    action_tstamp timestamp with time zone not null default current_timestamp,
    action        text                     not null check (action in ('I', 'D', 'U')),
    original_data text,
    new_data      text,
    query         text
) with (fillfactor = 100);

revoke all on audit.logged_actions from public;

-- You may wish to use different permissions; this lets anybody
-- see the full audit data. In Pg 9.0 and above you can use column
-- permissions for fine-grained control.
grant select on audit.logged_actions to public;

create index logged_actions_schema_table_idx
    on audit.logged_actions (((schema_name || '.' || table_name)::text));

create index logged_actions_action_tstamp_idx
    on audit.logged_actions (action_tstamp);

create index logged_actions_action_idx
    on audit.logged_actions (action);

/** CREATE IF_MODIFIED FUNCTION **/
create or replace function audit.if_modified_func() returns trigger as
$body$
declare
    v_old_data text;
    v_new_data text;
begin
    /*  if this actually for real auditing (where you need to log every action),
        then you would need to use something like dblink or plperl that could log outside the transaction,
        regardless of whether the transaction committed or rolled back.
    */
    /* this dance with casting the new and old values to a row is not necessary in pg 9.0+ */

    if (tg_op = 'UPDATE') then
        v_old_data := row (old.*);
        v_new_data := row (new.*);
        insert into audit.logged_actions (schema_name, table_name, user_name, action, original_data, new_data, query)
        values (tg_table_schema::text, tg_table_name::text, session_user::text, substring(tg_op, 1, 1), v_old_data,
                v_new_data, current_query());
        return new;
    elsif (tg_op = 'DELETE') then
        v_old_data := row (old.*);
        insert into audit.logged_actions (schema_name, table_name, user_name, action, original_data, query)
        values (tg_table_schema::text, tg_table_name::text, session_user::text, substring(tg_op, 1, 1), v_old_data,
                current_query());
        return old;
    elsif (tg_op = 'INSERT') then
        v_new_data := row (new.*);
        insert into audit.logged_actions (schema_name, table_name, user_name, action, new_data, query)
        values (tg_table_schema::text, tg_table_name::text, session_user::text, substring(tg_op, 1, 1), v_new_data,
                current_query());
        return new;
    else
        raise warning '[audit.if_modified_func] - other action occurred: %, at %',tg_op,now();
        return null;
    end if;

exception
    when data_exception then
        raise warning '[audit.if_modified_func] - udf error [data exception] - sqlstate: %, sqlerrm: %',sqlstate,sqlerrm;
        return null;
    when unique_violation then
        raise warning '[audit.if_modified_func] - udf error [unique] - sqlstate: %, sqlerrm: %',sqlstate,sqlerrm;
        return null;
    when others then
        raise warning '[audit.if_modified_func] - udf error [other] - sqlstate: %, sqlerrm: %',sqlstate,sqlerrm;
        return null;
end;
$body$
    language plpgsql
    security definer;


select plan(5);

/** Check Operation Compliance **/

-- GUIDELINE: Hard DELETION of records is not recommended
-- Soft DELETE the record and set a status or flag to indicate the record is “deleted”. I.e. is_deleted or deleted_ind
-- Create Rule to satisfy deletion guideline, comment out next 5 lines to test the test
create rule no_delete as on delete to test_fixture
    do instead
    update test_fixture
    set is_deleted = true
    where id = 1;

-- Create Trigger to satisfy audit guideline (next guideline), comment out next 3 lines to test the test
create trigger test_fixture_audit
    after insert or update or delete
    on test_fixture
    for each row
execute procedure audit.if_modified_func();

-- Run delete operation
delete
from test_fixture
where fname = 'Dylan';
-- Test that the rule exists on all tables in schema
with tnames as (select table_name from information_schema.tables where table_schema = 'ggircs_test_fixture')
select rule_is_on('ggircs_test_fixture', tbl, 'no_delete', 'delete',
                  format('Table has rule no_delete. Violation: %I', tbl))
from tnames f(tbl);
-- Test that record is not deleted
select isnt_empty('select fname from test_fixture', 'hard deletion of records is not recommended');
-- Test that is_deleted flag is set to true
select results_eq('select is_deleted from test_fixture where id=1', array [true],
                  'soft delete recommended (set is_deleted flag)');

-- GUIDELINE: Changes to the data must be able to be audited
-- Test that the trigger exists on all tables in schema
with tnames as (select table_name from information_schema.tables where table_schema = 'ggircs_test_fixture')
select has_trigger('ggircs_test_fixture', tbl, 'test_fixture_audit',
                   format('Table has audit trigger. Violation: %I', tbl))
from tnames f(tbl);
-- Test that the if_modified function was triggered when data was updated
select isnt_empty('select * from audit.logged_actions');
rollback;
