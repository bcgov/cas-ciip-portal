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
  temp_row record;
  form_result jsonb;
  init_function varchar(1000);
  query text;
begin

  --Insert new value into application
  insert into ggircs_portal.application(facility_id)
  values (facility_id_input) returning id into new_id;

  -- Insert new value with application_id fk into application_status
  insert into ggircs_portal.application_status(application_id, application_status)
  values (new_id, 'draft');

  select id, facility_id from ggircs_portal.application where id = new_id into result;

  for temp_row in
    select form_id from ggircs_portal.ciip_application_wizard
  loop
    form_result = '{}';
    if (select prepopulate_from_swrs from ggircs_portal.form_json where id = temp_row.form_id) then
      select form_result_init_function from ggircs_portal.form_json where id = temp_row.form_id into init_function;
      if (init_function is not null) then
        query := format('select * from ggircs_portal.%I($1,''2018'');', init_function);
        execute query
        using facility_id_input
        into form_result;
      end if;
    end if;
    -- loop over what is in the wizard, not the forms in case some forms get added/disabled etc
    insert into ggircs_portal.form_result(form_id, application_id, form_result)
    values (temp_row.form_id, new_id, form_result);

  end loop;
  return result;
end;
$function$ language plpgsql strict volatile;

commit;
