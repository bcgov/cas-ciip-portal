-- Verify ggircs-portal:database_functions/grant_permissions on pg

begin;

select pg_get_functiondef('ggircs_portal.grant_permissions(text,text,text)'::regprocedure);
select pg_get_functiondef('ggircs_portal.grant_permissions(text,text,text,text[])'::regprocedure);

rollback;
