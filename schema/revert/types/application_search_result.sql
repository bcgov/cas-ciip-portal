-- Revert ggircs-portal:type_application_search_result from pg

begin;

drop type ggircs_portal.application_search_result;

commit;
