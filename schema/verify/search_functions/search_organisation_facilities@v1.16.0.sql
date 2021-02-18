-- Verify ggircs-portal:function_search_organisation_facilities on pg

begin;

select pg_get_functiondef('ggircs_portal.search_organisation_facilities(text, text, text, text, text)'::regprocedure);

rollback;
