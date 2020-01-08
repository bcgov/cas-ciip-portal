-- Revert ggircs-portal:function_search_application_list from pg

begin;

drop function ggircs_portal.search_application_list;

commit;
