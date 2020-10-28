-- Revert mocks:schema_mocks from pg

BEGIN;

drop schema mocks;

COMMIT;
