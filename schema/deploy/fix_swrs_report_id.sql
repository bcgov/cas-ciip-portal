-- Deploy ggircs-portal:fix_swrs_report_id to pg

begin;

update ggircs_portal.application set swrs_report_id = (
    select r.swrs_report_id from swrs.report r where r.swrs_facility_id = (
        select swrs_facility_id from ggircs_portal.facility f
        where ggircs_portal.application.facility_id = f.id
    ) and r.reporting_period_duration = ggircs_portal.application.reporting_year);

commit;
