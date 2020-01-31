-- Verify ggircs-portal:database_functions/verify_grants on pg

begin;

select pg_get_functiondef('ggircs_portal.verify_grant(text,text,text)'::regprocedure);
select pg_get_functiondef('ggircs_portal.verify_grant(text,text,text,text[])'::regprocedure);

rollback;
