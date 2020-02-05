-- Verify ggircs-portal:database_functions/verify_policy on pg

begin;

select pg_get_functiondef('ggircs_portal.verify_policy(text,text,text,text)'::regprocedure);

rollback;
