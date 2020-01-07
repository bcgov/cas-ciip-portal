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

  select reporting_year from ggircs_portal.opened_reporting_year into current_reporting_year;
  if reporting_year is null then
    raise exception 'The application window is closed';
  end if;

  insert into ggircs_portal.application(facility_id, reporting_year)
  values (facility_id_input, current_reporting_year) returning id into new_id;

  perform ggircs_portal.create_application_revision_mutation_chain(new_id, 0);

  select * from ggircs_portal.application where id = new_id into result;
  return result;
end;
$function$ language plpgsql strict volatile;

commit;
