-- Revert ggircs-portal:type_facility_application_status from pg

begin;

drop type ggircs_portal.facility_application_status;

commit;
