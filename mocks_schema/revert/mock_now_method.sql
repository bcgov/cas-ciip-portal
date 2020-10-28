-- Revert mocks:mock_now_method from pg

BEGIN;

SET search_path = "$user",public;
drop function mocks.now;

COMMIT;
