-- Revert ggircs-portal:function_facility_has_swrs_report from pg

begin;

drop function ggircs_portal.facility_has_swrs_report(ggircs_portal.facility, varchar);

commit;
