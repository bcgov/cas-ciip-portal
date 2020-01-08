-- Revert ggircs-portal:function_search_ciip_user_organisation from pg

begin;

drop function ggircs_portal.search_ciip_user_organisation;

commit;
