-- Verify ggircs-portal:function_search_organisation_facilities on pg

begin;

select pg_get_functiondef('ggircs_portal.search_ciip_user_organisation(text, text, text, text)'::regprocedure);

rollback;
