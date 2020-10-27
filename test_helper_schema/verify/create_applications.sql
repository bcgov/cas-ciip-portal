-- Verify test_helpers:create_applications on pg

begin;

select pg_get_functiondef('test_helper.create_applications(int, boolean, boolean)'::regprocedure);

rollback;
