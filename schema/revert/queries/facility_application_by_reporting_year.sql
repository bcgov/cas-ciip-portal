-- Revert ggircs-portal:queries/facility_application_by_reporting_year from pg

begin;

drop function ggircs_portal.facility_application_by_reporting_year;

commit;
