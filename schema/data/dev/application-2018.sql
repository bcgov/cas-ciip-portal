begin;

  -- Set the current reporting year to 2018, application open
  select mocks.set_mocked_time_in_transaction(
    (
      select application_open_time
      from ggircs_portal.reporting_year
      where reporting_year = 2018
    )
  );

  alter table ggircs_portal.application disable trigger _send_draft_application_email;
  alter table ggircs_portal.application_revision_status disable trigger _status_change_email;

  -- Set a jwt token so that the created_by columns are not null on creation of application;
  set jwt.claims.sub to '00000000-0000-0000-0000-000000000000';

  -- Disable trigger to override default behaviour and manually assign a legacy review_step below
  alter table ggircs_portal.application_revision_status disable trigger _create_or_refresh_review_step;
   -- Create applications
  select 'Calling ggircs_portal.create_application_mutation_chain: ';
  select ggircs_portal.create_application_mutation_chain(2);
  select ggircs_portal.create_application_mutation_chain(3);

  do $$
    declare app_id integer;
    begin
      app_id = (select id from ggircs_portal.application where reporting_year=2018 and facility_id=2);

      -- Set application submitted
      update ggircs_portal.application_revision_status set application_revision_status='submitted' where application_id=app_id and version_number=1;
      -- Create a legacy application_review_step for the 2018 application with ID=3
      insert into ggircs_portal.application_review_step(application_id, review_step_id) values (app_id,1);
      -- Create a comment
      insert into ggircs_portal.review_comment(description, comment_type, application_review_step_id)
        values ('This is a comment','general', (select id from ggircs_portal.application_review_step where application_id=app_id));
      update ggircs_portal.application_revision_status set application_revision_status='requested changes' where application_id=app_id and version_number=1;

      -- Set legal_disclaimer_accepted to true for application id=3
      update ggircs_portal.application_revision set legal_disclaimer_accepted = true where application_id=app_id;

    end;
  $$;


  alter table ggircs_portal.application_revision_status enable trigger _status_change_email;
  alter table ggircs_portal.application enable trigger _send_draft_application_email;
  alter table ggircs_portal.application_revision_status enable trigger _create_or_refresh_review_step;

commit;
