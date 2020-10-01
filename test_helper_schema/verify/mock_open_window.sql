-- Verify test_helpers:mock_open_window on pg

BEGIN;

select pg_get_functiondef('test_helper.mock_open_window()'::regprocedure);

ROLLBACK;
