-- Revert ggircs-portal:function_application_swrs_facility_data from pg

begin;

drop function ggircs_portal.application_swrs_facility_data;

commit;
