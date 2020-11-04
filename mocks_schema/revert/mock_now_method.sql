-- Revert mocks:mock_now_method from pg

BEGIN;

drop function mocks.now;

COMMIT;
