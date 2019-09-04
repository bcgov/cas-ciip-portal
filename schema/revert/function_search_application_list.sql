-- Revert ggircs-portal:function_search_application_list from pg

BEGIN;

drop function ggircs_portal.search_application_list;

COMMIT;
