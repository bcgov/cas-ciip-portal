-- Verify mocks:mock_now_method on pg

BEGIN;

select pg_get_functiondef('mocks.now()'::regprocedure);

ROLLBACK;
