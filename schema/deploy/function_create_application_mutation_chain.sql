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
  form_count int;
  temp_row record;
begin

  --Insert new value into application
  insert into ggircs_portal.application(facility_id)
  values (facility_id_input) returning id into new_id;

  -- Insert new value with application_id fk into application_status
  insert into ggircs_portal.application_status(application_id, application_status)
  values (new_id, 'draft');

  select count(form_id) as c from ggircs_portal.ciip_application_wizard into form_count;

  select id, facility_id from ggircs_portal.application where id = new_id into result;

  for temp_row in

    select form_id from ggircs_portal.ciip_application_wizard

  -- loop over number of forms and create a form_result row for each
  loop
    -- loop over what is in the wizard, not the forms in case some forms get added/disabled etc
    insert into ggircs_portal.form_result(form_id, user_id, application_id, form_result)
    values (temp_row.form_id, 2, new_id, '{}');

  end loop;

  return result;
end;
$function$ language plpgsql strict volatile;

commit;
