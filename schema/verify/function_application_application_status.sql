-- Verify ggircs-portal:function_application_application_status on pg

BEGIN;

select pg_get_functiondef('ggircs_portal.application_application_status(ggircs_portal.application)'::regprocedure);

ROLLBACK;
