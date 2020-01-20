/**
  This dummy data creation file creates 2 applications with the create_application_mutation_chain.
  1) application id=1 is in 'submitted' status with some dummy form_result data (inserted in form_result.sql)
  2) application id=2 is created, but not started. It is in a ready state to begin the application process.
*/

begin;

  select 'Dropping old application data: ';
  truncate ggircs_portal.application restart identity cascade;

  -- Create applications
  select 'Calling ggircs_portal.create_application_mutation_chain: ';
  select ggircs_portal.create_application_mutation_chain(1);
  select ggircs_portal.create_application_mutation_chain(2);

  -- Create an application revision on application id=1
  select ggircs_portal.create_application_revision_mutation_chain(1,1);

  -- Set certification_signature to dummy value for application id=1
  update ggircs_portal.application_revision set certification_signature = 'signed' where application_id=1;

  -- Set legal_disclaimer_accepted to true for application id=1
  update ggircs_portal.application_revision set legal_disclaimer_accepted = true where application_id=1;

  -- Update the status of application with id=1 to be 'submitted'
  update ggircs_portal.application_revision_status set application_revision_status = 'submitted' where application_id=1;

commit;
