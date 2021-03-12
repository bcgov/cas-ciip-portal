-- Revert ggircs-portal:computed_columns/facility_application_application_status from pg

begin;

drop function ggircs_portal.facility_application_application_status;

commit;
