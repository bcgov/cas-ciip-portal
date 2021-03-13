-- Verify ggircs-portal:database_functions/verify_policy_not_present on pg

BEGIN;

select pg_get_functiondef('ggircs_portal_private.verify_policy_not_present(text,text)'::regprocedure);

ROLLBACK;
