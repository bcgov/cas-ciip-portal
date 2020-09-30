-- Verify test_helpers:initialize_form_result_table_helper on pg

BEGIN;

select pg_get_functiondef('test_helper.initialize_form_result(int, int)'::regprocedure);

ROLLBACK;
