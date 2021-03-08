-- Verify ggircs-portal:function_search_products on pg

begin;

select pg_get_functiondef('ggircs_portal.search_products(text,text,text,text)'::regprocedure);

rollback;
