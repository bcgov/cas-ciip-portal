-- Deploy test_helpers:create_applications to pg
-- requires: schema_test_helper

-- Function creates a defined number of applications.
-- If create_dependencies is set to True, this function will create the necessary organisations and facilities as well.
begin;

  create or replace function test_helper.create_applications(app_count int, same_organisation boolean, create_dependencies boolean)
  returns void as
  $function$
    begin

      if (same_organisation) then
        if (create_dependencies) then
        insert into ggircs_portal.organisation(report_id, swrs_report_id, swrs_organisation_id, operator_name, cra_business_number)
          values (1, 1, 1, 'test_organisation', 100000000);
        end if;
        for x in 1..app_count
          loop

            if (create_dependencies) then
            insert into ggircs_portal.facility(organisation_id, facility_name, bcghgid)
              values (1, (select concat('test_organisation_facility_', x)), 10000+x);
            end if;

            perform ggircs_portal.create_application_mutation_chain(x);
          end loop;
          raise notice 'created % applications for one test organisation', app_count;
      else
        for x in 1..app_count
          loop

            if (create_dependencies) then
            insert into ggircs_portal.organisation(report_id, swrs_report_id, swrs_organisation_id, operator_name, cra_business_number)
              values (999+x, 9999+x, 9+x, (select concat('test_organisation ', x)), 100000000+x);
            insert into ggircs_portal.facility(organisation_id, facility_name, bcghgid)
              values (x, (select concat('test_organisation_', x, '_facility')), 9000+x);
            end if;

            perform ggircs_portal.create_application_mutation_chain(x);
          end loop;
          raise notice'created test applications in % organisations', app_count;
      end if;

    end;

  $function$ language plpgsql volatile;

commit;
