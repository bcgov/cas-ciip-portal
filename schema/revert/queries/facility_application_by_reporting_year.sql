-- Revert ggircs-portal:queries/facility_application_by_reporting_year from pg

begin;

drop function ggircs_portal.facility_application_by_reporting_year;
drop function ggircs_portal.facility_application_application_status;
drop function ggircs_portal.facility_application_last_swrs_reporting_year;
drop type ggircs_portal.facility_application;
commit;
