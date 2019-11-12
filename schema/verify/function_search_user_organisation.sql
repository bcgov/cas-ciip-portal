-- Verify ggircs-portal:function_search_user_organisation on pg

begin;

select pg_get_functiondef('ggircs_portal.search_user_organisation(text,text,text,text)'::regprocedure);

rollback;
