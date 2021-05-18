/**
  This dummy data creation file creates 2 applications with the create_application_mutation_chain.
  1) application id=1 is in 'submitted' status with some dummy form_result data (inserted in form_result.sql)
  2) application id=2 is created, but not started. It is in a ready state to begin the application process.
*/

begin;

  -- Set time where application is open, reporting year 2019
  select mocks.set_mocked_time_in_transaction('2020-07-03 00:00:00.000000-07'::timestamptz);

  select 'Dropping old application data: ';
  truncate ggircs_portal.application restart identity cascade;

  alter table ggircs_portal.application_revision_status disable trigger _status_change_email;

  -- Set a jwt token so that the created_by columns are not null on creation of application;
  set jwt.claims.sub to '00000000-0000-0000-0000-000000000000';

  -- Create applications
  select 'Calling ggircs_portal.create_application_mutation_chain: ';
  select ggircs_portal.create_application_mutation_chain(1);
  select ggircs_portal.create_application_mutation_chain(2);

  select ggircs_portal.create_application_mutation_chain(10);
  select ggircs_portal.create_application_mutation_chain(11);
  select ggircs_portal.create_application_mutation_chain(12);

  -- Create an application revision on application id=1
  select ggircs_portal.create_application_revision_mutation_chain(1,1);
  select ggircs_portal.create_application_revision_mutation_chain(3,1);

  -- Set legal_disclaimer_accepted to true for application id=1
  update ggircs_portal.application_revision set legal_disclaimer_accepted = true where application_id=1;

  update ggircs_portal.application_revision set legal_disclaimer_accepted = true where application_id=3;
  update ggircs_portal.application_revision set legal_disclaimer_accepted = true where application_id=4;
  update ggircs_portal.application_revision set legal_disclaimer_accepted = true where application_id=5;

  alter table ggircs_portal.application_revision_status enable trigger _status_change_email;

commit;
