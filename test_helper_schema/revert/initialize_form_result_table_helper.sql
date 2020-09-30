-- Revert test_helpers:initialize_form_result_table_helper from pg

BEGIN;

drop function test_helper.initialize_form_result(int, int);

COMMIT;
