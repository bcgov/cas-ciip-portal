-- Verify ggircs-portal:function_search_application_list on pg

BEGIN;

select pg_get_functiondef('ggircs_portal.search_application_list(text,text,text,text)'::regprocedure);

ROLLBACK;
