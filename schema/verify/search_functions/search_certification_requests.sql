-- Verify ggircs-portal:search_functions/search_certification_url on pg

begin;

select pg_get_functiondef('ggircs_portal.search_certification_requests(text[],text[],text,text,int,int)'::regprocedure);

rollback;
