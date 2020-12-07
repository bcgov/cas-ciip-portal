-- Verify mocks:set_mocked_time_in_transaction on pg

BEGIN;

select pg_get_functiondef('mocks.set_mocked_time_in_transaction(int)'::regprocedure);

ROLLBACK;
