-- Revert test_helpers:initialize_form_result_table_helper from pg

BEGIN;

drop function test_helper.initialize_all_form_result_data(int, int);
drop function test_helper.initialize_form_result_data(int, int, int);
drop function test_helper.validate_form_result_data(int, int, int);

COMMIT;
