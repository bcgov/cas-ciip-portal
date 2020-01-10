-- Deploy ggircs-portal:function_create_application_revision_mutation_chain to pg
-- requires: table_application_revision_status

begin;

create or replace function ggircs_portal.create_application_revision_mutation_chain(application_id_input int, last_revision_id_input int)
returns ggircs_portal.application_revision
as $function$
declare
  new_version_number int;
  form_result_id int;
  temp_row record;
  form_result jsonb;
  init_function varchar(1000);
  query text;
  result ggircs_portal.application_revision;
  facility_id_input int;
begin

  new_version_number := last_revision_id_input + 1;

  -- Insert new row in application_revision
  insert into ggircs_portal.application_revision(application_id, version_number)
  values (application_id_input, new_version_number);

  -- Insert new value with application_id fk and version 1 into application_revision_status
  insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (application_id_input, new_version_number, 'draft');

  select facility_id from ggircs_portal.application where id = application_id_input into facility_id_input;

  for temp_row in
    select form_id from ggircs_portal.ciip_application_wizard
  loop
    -- Populate new revision of form_results with data from previous result on new revision creation
    if last_revision_id_input > 0 then
      select fr.form_result from ggircs_portal.form_result fr
      where fr.form_id = temp_row.form_id
      and fr.application_id = application_id_input
      and fr.version_number=last_revision_id_input
      into form_result;
    else
      -- Populate initial version of application form results with data from swrs or empty results
      if ((select fj.name from ggircs_portal.form_json as fj where temp_row.form_id = fj.id) in ('Production', 'fuel')) then
        form_result='[{}]';
      else
        form_result = '{}';
      end if;
      if (select prepopulate_from_swrs from ggircs_portal.form_json where id = temp_row.form_id) then
        select form_result_init_function from ggircs_portal.form_json where id = temp_row.form_id into init_function;
        if (init_function is not null) then
          query := format('select * from ggircs_portal.%I($1, 2018);', init_function);
          execute query
          using facility_id_input
          into form_result;
        end if;
      end if;
    end if;

    -- loop over what is in the wizard, not the forms in case some forms get added/disabled etc
    insert into ggircs_portal.form_result(form_id, application_id, version_number, form_result)
    values (temp_row.form_id, application_id_input, new_version_number, form_result) returning id into form_result_id;

  end loop;

  select * from ggircs_portal.application_revision where application_id = application_id_input and version_number = new_version_number into result;
  return result;
end;
$function$ language plpgsql strict volatile;

commit;
