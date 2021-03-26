-- Deploy ggircs-portal:swrs_functions/refresh_swrs_version_data to pg
-- requires: tables/form_json_001
-- requires: tables/form_result
-- requires: swrs_functions/init_application_administration_form_result
-- requires: swrs_functions/init_application_emission_form_result
-- requires: swrs_functions/init_application_fuel_form_result

begin;

create or replace function ggircs_portal_private.refresh_swrs_version_data() returns void
as $function$
declare
  report_imported_at timestamptz;
  application_temp_row record;
  form_json_temp_row record;
  init_function varchar(1000);
  new_form_result jsonb;
  query text;
  empty_form_result jsonb;
begin

  for application_temp_row in select * from ggircs_portal.application
    loop
      report_imported_at := (select imported_at from swrs.report r where r.id = application_temp_row.report_id);

      -- Create application_revision, status and form_results with version number = 0 if a report exists and the 0 version does not
      if (report_imported_at is not null
          and
          (select application_id from ggircs_portal.application_revision
          where application_id = application_temp_row.id and version_number = 0) is null
      ) then
          insert into ggircs_portal.application_revision(application_id, version_number)
            values (application_temp_row.id, 0);
          insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
            values (application_temp_row.id, 0, 'submitted');
          for form_json_temp_row in select form_id from ggircs_portal.ciip_application_wizard where is_active=true
          loop

            select form_result_init_function from ggircs_portal.form_json fj where fj.id = form_json_temp_row.form_id into init_function;
            if (init_function is not null) then

              query := format('select * from ggircs_portal.%I($1, $2);', init_function);
              execute query
                using application_temp_row.facility_id, application_temp_row.reporting_year
                into new_form_result;
              insert into ggircs_portal.form_result(application_id, version_number, form_id, form_result)
                values (application_temp_row.id, 0, form_json_temp_row.form_id, new_form_result);
            else
              insert into ggircs_portal.form_result(application_id, version_number, form_id, form_result)
                values (application_temp_row.id, 0, form_json_temp_row.form_id, (select default_form_result from ggircs_portal.form_json where id = form_json_temp_row.form_id));
            end if;
          end loop;
          raise notice 'Created new swrs version (version 0) for application ID: %', application_temp_row.id;

      -- Do nothing if a swrs report does not exist
      elsif (report_imported_at is not null) then

        for form_json_temp_row in select form_id from ggircs_portal.ciip_application_wizard where is_active=true
          loop
            -- Compare timestamp (truncated to day) of form_result.updated_at to timestamp (truncated to day) of report.imported_at
            if ((select date_trunc('day', updated_at) from ggircs_portal.form_result fr
                where fr.form_id = form_json_temp_row.form_id
                and fr.application_id = application_temp_row.id
                and fr.version_number = 0) < date_trunc('day', report_imported_at))
            then

              select form_result_init_function from ggircs_portal.form_json fj where fj.id = form_json_temp_row.form_id into init_function;
              if (init_function is not null) then

                query := format('select * from ggircs_portal.%I($1, $2);', init_function);
                execute query
                  using application_temp_row.facility_id, application_temp_row.reporting_year
                  into new_form_result;

                update ggircs_portal.form_result fr set form_result=new_form_result
                  where fr.application_id = application_temp_row.id
                  and fr.version_number = 0
                  and fr.form_id = form_json_temp_row.form_id;
              end if;
            end if;
          end loop;
          raise notice 'updated swrs version (version 0) for application ID: %', application_temp_row.id;
      end if;
    end loop;

end;

$function$ language plpgsql volatile;

comment on function ggircs_portal_private.refresh_swrs_version_data is 'This function updates the form results relating to the swrs version of an application (version 0) if the form results were updated prior to the import date of the report. Creates the form results for version 0 if it does not exist';

commit;
