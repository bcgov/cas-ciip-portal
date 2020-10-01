-- Verify test_helpers:initialize_form_result_table_helper on pg

BEGIN;

select pg_get_functiondef('test_helper.initialize_all_form_result_data(int, int)'::regprocedure);
select pg_get_functiondef('test_helper.initialize_form_result_data(int, int, int)'::regprocedure);
select pg_get_functiondef('test_helper.validate_form_result_data(int, int, int)'::regprocedure);

ROLLBACK;
