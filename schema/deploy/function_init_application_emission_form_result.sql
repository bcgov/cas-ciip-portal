-- Deploy ggircs-portal:function_init_application_emission_form_result to pg

begin;

create or replace function ggircs_portal.init_application_emission_form_result(facility_id int, reporting_year varchar(1000))
returns jsonb
as $function$
declare
  swrs_facility_id int;

begin
  select facility.swrs_facility_id from ggircs_portal.facility where id = facility_id into swrs_facility_id;

  return concat(
    '{}')::jsonb;

end;
$function$ language plpgsql strict volatile;

commit;
