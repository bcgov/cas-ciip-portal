-- Revert ggircs-portal:computed_columns/facility_application_last_swrs_reporting_year from pg

begin;

drop function ggircs_portal.facility_application_last_swrs_reporting_year;

commit;
