-- Verify test_helpers:truncate_function on pg

BEGIN;

select pg_get_functiondef('test_helper.clean_ggircs_portal_schema()'::regprocedure);

ROLLBACK;
