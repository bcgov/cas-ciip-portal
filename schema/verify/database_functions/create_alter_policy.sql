-- Verify ggircs-portal:database_functions/create_alter_policy on pg

begin;

select pg_get_functiondef('ggircs_portal.create_alter_policy(text,text,text,text,text,text,text)'::regprocedure);

rollback;
