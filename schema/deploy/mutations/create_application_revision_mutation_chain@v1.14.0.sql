-- Deploy ggircs-portal:function_create_application_revision_mutation_chain to pg
-- requires: table_application_revision_status

begin;

create or replace function ggircs_portal.create_application_revision_mutation_chain(application_id_input int, last_revision_id_input int)
returns ggircs_portal.application_revision
as $function$
declare
  new_version_number int;
  form_result_id int;
  current_reporting_year int;
  temp_row record;
  form_result jsonb;
  init_function varchar(1000);
  query text;
  result ggircs_portal.application_revision;
  facility_id_input int;
  has_swrs_data boolean default false;
begin
  new_version_number := last_revision_id_input + 1;

  -- Insert new row in application_revision
  insert into ggircs_portal.application_revision(application_id, version_number)
  values (application_id_input, new_version_number);

  select reporting_year from ggircs_portal.opened_reporting_year() into current_reporting_year;
  if new_version_number <= 1 and current_reporting_year is null then
    raise exception 'The application window is closed';
  end if;

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
          query := format('select * from ggircs_portal.%I($1, $2);', init_function);
          execute query
          using facility_id_input, current_reporting_year
          into form_result;
        end if;
      end if;

    end if;

    -- loop over what is in the wizard, not the forms in case some forms get added/disabled etc
    insert into ggircs_portal.form_result(form_id, application_id, version_number, form_result)
    values (temp_row.form_id, application_id_input, new_version_number, form_result) returning id into form_result_id;

    if last_revision_id_input = 0 then
    -- Create form result statuses
      insert into ggircs_portal.form_result_status(application_id, form_id, form_result_status)
      values (application_id_input, temp_row.form_id, 'in review');
    end if;

  end loop;

  -- If the application's facility has a report_id then there is a swrs report.
  if (exists(select id from ggircs_portal.facility where id=facility_id_input and report_id is not null)
  and last_revision_id_input = 0) then
    has_swrs_data := true;
  end if;

  -- Create a duplicate revision 'version 0' with form_results if has_swrs_data = true;
  if (has_swrs_data) then
    insert into ggircs_portal.application_revision(application_id, version_number)
    values (application_id_input, 0);
    insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (application_id_input, 0, 'submitted');
    for temp_row in
      select form_id from ggircs_portal.ciip_application_wizard
    loop
      insert into ggircs_portal.form_result(form_id, application_id, version_number, form_result)
    values (temp_row.form_id, application_id_input, 0, (select fr.form_result
                                                        from ggircs_portal.form_result fr
                                                        where fr.application_id = application_id_input
                                                        and fr.form_id = temp_row.form_id
                                                        and fr.version_number = 1));
    end loop;
  end if;

  select * from ggircs_portal.application_revision where application_id = application_id_input and version_number = new_version_number into result;
  return result;
end;
$function$ language plpgsql strict volatile;

grant execute on function ggircs_portal.create_application_revision_mutation_chain to ciip_administrator, ciip_analyst, ciip_industry_user;

commit;
