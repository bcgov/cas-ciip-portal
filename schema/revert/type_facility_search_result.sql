-- Revert ggircs-portal:type_facility_search_result from pg

begin;

drop type ggircs_portal.facility_search_result;

commit;
