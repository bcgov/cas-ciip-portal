-- Verify ggircs-portal:function_insert_dummy_application_data on pg

BEGIN;

select pg_get_functiondef('ggircs_portal.insert_dummy_application_data()'::regprocedure);

ROLLBACK;
