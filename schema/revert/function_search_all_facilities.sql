-- Revert ggircs-portal:function_search_all_facilities from pg

begin;

drop function ggircs_portal.function_search_all_facilities;

commit;
