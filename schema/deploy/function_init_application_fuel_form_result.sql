-- Deploy ggircs-portal:function_init_application_fuel_form_result to pg

begin;

create or replace function ggircs_portal.init_application_fuel_form_result(facility_id int, reporting_year varchar(1000))
returns jsonb
as $function$
declare
  swrs_facility_id int;
  fuel_data ggircs_portal.fuel_data[];
  result text;

begin
  select facility.swrs_facility_id from ggircs_portal.facility where id = facility_id into swrs_facility_id;
  select * from ggircs_portal.get_swrs_fuel_data(swrs_facility_id, reporting_year) into fuel_data;

  if fuel_data is null then
    return '[]';
  end if;

  return concat(
    '[]')::jsonb;

end;
$function$ language plpgsql strict volatile;

commit;
