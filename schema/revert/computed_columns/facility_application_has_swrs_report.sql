-- Revert ggircs-portal:computed_columns/facility_application_has_swrs_report from pg

begin;

drop function ggircs_portal.facility_application_has_swrs_report;

commit;
