-- Verify ggircs-portal:database_functions/verify_policy on pg

begin;

select pg_get_functiondef('ggircs_portal_private.verify_policy(text,text,text,text)'::regprocedure);

rollback;
