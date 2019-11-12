-- Revert ggircs-portal:function_search_user_organisation from pg

begin;

drop function ggircs_portal.search_user_organisation;

commit;
