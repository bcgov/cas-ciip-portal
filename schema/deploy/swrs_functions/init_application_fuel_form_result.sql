-- Deploy ggircs-portal:function_init_application_fuel_form_result to pg

begin;

create or replace function ggircs_portal.init_application_fuel_form_result(facility_id int, reporting_year integer)
returns jsonb
as $function$
declare
  swrs_facility_id int;
  fuel_datum ggircs_portal.fuel_data;
  result text;
  first_fuel boolean;

begin
  select facility.swrs_facility_id from ggircs_portal.facility where id = facility_id into swrs_facility_id;

  result := '[';

  first_fuel := true;
  for fuel_datum in (select * from ggircs_portal.get_swrs_fuel_data(swrs_facility_id, reporting_year))
  loop
    if first_fuel = false then
      result := concat(result, ',');
    end if;
    first_fuel := false;
    result := concat(result,
      '{',
      '"fuelType": "', fuel_datum.fuel_type, '",',
      '"quantity": ', fuel_datum.annual_fuel_amount, ',',
      '"fuelUnits": "', fuel_datum.fuel_units, '",',
      '"methodology": "', fuel_datum.alternative_methodolody_description, '"',
      '}'
      );
  end loop;
  result := concat(result, ']');
  return result;

end;
$function$ language plpgsql strict volatile;

grant execute on function ggircs_portal.init_application_fuel_form_result to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
