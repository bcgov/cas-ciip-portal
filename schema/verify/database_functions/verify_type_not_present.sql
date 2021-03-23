-- Verify ggircs-portal:database_functions/verify_type_not_present on pg

BEGIN;

select pg_get_functiondef('ggircs_portal_private.verify_type_not_present(text)'::regprocedure);

ROLLBACK;
