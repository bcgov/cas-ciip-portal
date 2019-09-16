-- Verify ggircs-portal:function_create_application_status on pg

BEGIN;

select pg_get_functiondef('ggircs_portal.create_application_status()'::regprocedure);

ROLLBACK;
