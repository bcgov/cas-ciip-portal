begin;

  truncate ggircs_portal.application restart identity cascade;

  alter table ggircs_portal.application disable trigger _send_draft_application_email;
  alter table ggircs_portal.application_revision_status disable trigger _status_change_email;

  -- Set a jwt token so that the created_by columns are not null on creation of application;
  set jwt.claims.sub to '00000000-0000-0000-0000-000000000000';

  -- Disable trigger to override default behaviour and manually assign a legacy review_step below
  alter table ggircs_portal.application_revision_status disable trigger _create_or_refresh_review_step;
   -- Create applications

create or replace function add_dev_apps(num int)
returns void
as $$
declare
      temp_row record;
      operator_type text;
    begin
      for mocked_year in 2018..2025 loop

        perform mocks.set_mocked_time_in_transaction(
          (
            select application_open_time
            from ggircs_portal.reporting_year
            where reporting_year = mocked_year
          )
        );

        if mocked_year = 2020 then
          alter table ggircs_portal.application_revision_status enable trigger _create_or_refresh_review_step;
        end if;

        raise notice 'Reporting year: %', mocked_year;
        for operator_type in (select operator_name from ggircs_portal.organisation where operator_name in ('Draft operator', 'Submitted operator', 'Changes requested operator'))
        loop
          raise notice 'Creating % applications for %', num, operator_type;
          for temp_row in
            select facility.id as id from ggircs_portal.facility
            join ggircs_portal.organisation
            on facility.organisation_id = organisation.id
            and operator_name = operator_type limit num
          loop
            perform ggircs_portal.create_application_mutation_chain(temp_row.id);
          end loop;
        end loop;

        for operator_type in (select operator_name from ggircs_portal.organisation where operator_name in ('Submitted operator', 'Changes requested operator'))
        loop
          raise notice 'Submitting applications for %', operator_type;
          for temp_row in
            select a.id as id from ggircs_portal.application a
            join ggircs_portal.facility f
            on a.facility_id = f.id
            join ggircs_portal.organisation o
            on f.organisation_id = o.id
            and operator_name = operator_type
            and a.reporting_year=mocked_year
          loop
            insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
            values (temp_row.id, 1, 'submitted');

            if mocked_year in (2018, 2019) then
              insert into ggircs_portal.application_review_step(application_id, review_step_id) values (temp_row.id, 1);
            end if;
          end loop;
        end loop;

        raise notice 'Requesting changes on applications for Changes requested operator';
        for temp_row in
          select a.id as id from ggircs_portal.application a
          join ggircs_portal.facility f
          on a.facility_id = f.id
          join ggircs_portal.organisation o
          on f.organisation_id = o.id
          and operator_name = 'Changes requested operator'
        loop
          insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
          values (temp_row.id, 1, 'requested changes');
          update ggircs_portal.application_review_step set is_complete=true where application_id=temp_row.id;
        end loop;

      end loop;

    end
$$ language plpgsql volatile;

select add_dev_apps(:num_apps);

drop function add_dev_apps;

commit;
