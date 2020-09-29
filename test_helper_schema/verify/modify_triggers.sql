-- Verify test_helpers:modify_triggers on pg

begin;

select pg_get_functiondef('test_helper.modify_triggers(text)'::regprocedure);

rollback;
