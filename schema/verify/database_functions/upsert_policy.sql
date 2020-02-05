-- Verify ggircs-portal:database_functions/upsert_policy on pg

begin;

select pg_get_functiondef('ggircs_portal.upsert_policy(text,text,text,text,text)'::regprocedure);
select pg_get_functiondef('ggircs_portal.upsert_policy(text,text,text,text,text,text)'::regprocedure);

rollback;
