-- Verify test_helpers:create_products on pg

BEGIN;

select pg_get_functiondef('test_helper.create_product(int, text, text, text, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, timestamp)'::regprocedure);

ROLLBACK;
