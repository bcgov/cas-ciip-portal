-- Revert test_helpers:truncate_function from pg

BEGIN;

drop function test_helper.clean_ggircs_portal_schema();

COMMIT;
