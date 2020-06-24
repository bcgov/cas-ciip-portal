-- Revert ggircs-portal:computed_columns/facility_has_swrs_report_001 from pg

begin;

drop function ggircs_portal.facility_has_swrs_report;

create or replace function ggircs_portal.facility_has_swrs_report(facility ggircs_portal.facility, reporting_year integer)
  returns boolean
as
$function$
declare
begin
  return (select count(*) from ggircs_portal.get_swrs_facility_data(facility.swrs_facility_id, reporting_year) where report_id is not null);
end;

$function$
  language 'plpgsql' stable;

grant execute on function ggircs_portal.facility_has_swrs_report to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
