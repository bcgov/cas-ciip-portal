-- Deploy ggircs-portal:function_search_all_facilities to pg
-- requires: type_facility_search_result
-- requires: view_ciip_application

begin;

drop function ggircs_portal.search_all_facilities;

commit;
