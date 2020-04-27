-- Verify ggircs-portal:function_search_all_facilities on pg

begin;

select pg_get_functiondef('ggircs_portal.search_all_facilities(text,text,text,text,text,int)'::regprocedure);

rollback;
