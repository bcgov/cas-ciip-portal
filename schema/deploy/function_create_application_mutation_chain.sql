-- Deploy ggircs-portal:function_create_application_mutation_chain to pg
-- requires: table_application
-- requires: table_application_status

begin;

create or replace function ggircs_portal.create_application_mutation_chain(facility_id_input int)
returns ggircs_portal.application
as $function$
declare
  new_id int;
  result ggircs_portal.application;
begin

  --Insert new value into application
  insert into ggircs_portal.application(facility_id)
  values (facility_id_input) returning id into new_id;

  -- Insert new value with application_id fk into application_status
  insert into ggircs_portal.application_status(application_id, application_status)
  values (new_id, 'draft');

  select id, facility_id from ggircs_portal.application where id = new_id into result;
  return result;
end;
$function$ language plpgsql strict volatile;

commit;
