-- Revert ggircs-portal:types/facility_application from pg

begin;

drop type ggircs_portal.facility_application;

commit;
