-- Deploy ggircs-portal:function_facility_has_swrs_report to pg
-- requires: table_facility

begin;

create or replace function ggircs_portal.facility_has_swrs_report(facility ggircs_portal.facility, reporting_year varchar(1000))
  returns boolean
as
$function$
declare
begin
  return (select count(*) from ggircs_portal.get_swrs_facility_data(facility.swrs_facility_id, reporting_year) where report_id is not null);
end;

$function$
  language 'plpgsql' stable;

commit;
