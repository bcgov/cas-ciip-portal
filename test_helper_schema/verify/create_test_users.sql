-- Verify test_helpers:create_test_users on pg

begin;

select pg_get_functiondef('test_helper.create_test_users()'::regprocedure);

rollback;
