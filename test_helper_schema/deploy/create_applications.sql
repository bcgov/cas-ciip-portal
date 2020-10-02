-- Deploy test_helpers:create_applications to pg
-- requires: schema_test_helper

-- This is a work in progress.
-- Not sure if always creating the dependencies will have annoying/confusing side effects when trying to set up tests.
-- Needs more investigation as we replace the code in the fixtures with the test_helper functions to see if there are side effects.

begin;

  create or replace function test_helper.create_applications(app_count int, same_organisation boolean)
  returns void as
  $function$
    begin

      if (same_organisation) then
        insert into ggircs_portal.organisation(report_id, swrs_report_id, swrs_organisation_id, operator_name, cra_business_number)
          values (1, 1, 1, (select concat('test_organisation')), 100000000);
        for x in 1..app_count
          loop
            insert into ggircs_portal.facility(organisation_id, facility_name, bcghgid)
              values (1, (select concat('test_organisation_facility_', x)), 10000+x);
            perform ggircs_portal.create_application_mutation_chain(x);
          end loop;
          raise notice 'created % facilities for one test organisation', app_count;
      else
        for x in 1..app_count
          loop
            insert into ggircs_portal.organisation(report_id, swrs_report_id, swrs_organisation_id, operator_name, cra_business_number)
              values (999+x, 9999+x, 9+x, (select concat('test_organisation ', x)), 100000000+x);
            insert into ggircs_portal.facility(organisation_id, facility_name, bcghgid)
              values (x, (select concat('test_organisation_', x, '_facility')), 9000+x);
            perform ggircs_portal.create_application_mutation_chain(x);
          end loop;
          raise notice'created test facilities in % organisations', app_count;
      end if;

    end;

  $function$ language plpgsql volatile;

commit;
