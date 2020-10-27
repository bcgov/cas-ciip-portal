-- Verify test_helpers:certify_application on pg

begin;

select pg_get_functiondef('test_helper.certify_application(int, int, int)'::regprocedure);

rollback;
