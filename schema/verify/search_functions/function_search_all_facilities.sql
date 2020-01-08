-- Verify ggircs-portal:function_search_all_facilities on pg

begin;

select pg_get_functiondef('ggircs_portal.search_application_list(text,text,text,text)'::regprocedure);

rollback;
