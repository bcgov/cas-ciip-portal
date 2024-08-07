-- Deploy ggircs-portal:function_create_application_mutation_chain to pg
-- requires: table_application
-- requires: table_application_revision_status

begin;

create or replace function ggircs_portal.create_application_mutation_chain(facility_id_input int)
returns ggircs_portal.application
as $function$
declare
  new_id int;
  current_reporting_year int;
  result ggircs_portal.application;
begin

  select reporting_year from ggircs_portal.opened_reporting_year() into current_reporting_year;
  if current_reporting_year is null then
    raise exception 'The application window is closed';
  end if;


  with app_swrs_report as (
    select swrs_report_id, version
    from swrs.report
    where swrs_facility_id = (
      select swrs_facility_id
      from ggircs_portal.facility
      where id = facility_id_input
    ) and reporting_period_duration = current_reporting_year
  ) insert into ggircs_portal.application(facility_id, reporting_year, swrs_report_id, swrs_report_version)
    values (
      facility_id_input, current_reporting_year,
      (select swrs_report_id from app_swrs_report),
      (select version from app_swrs_report)
    ) returning id into new_id;

  perform ggircs_portal.create_application_revision_mutation_chain(new_id, 0);

  select * from ggircs_portal.application where id = new_id into result;
  return result;
end;
$function$ language plpgsql strict volatile;

grant execute on function ggircs_portal.create_application_mutation_chain to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
