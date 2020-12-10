-- Revert mocks:set_mocked_time_in_transaction from pg

BEGIN;

drop function mocks.set_mocked_time_in_transaction;

COMMIT;
