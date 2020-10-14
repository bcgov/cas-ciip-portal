-- disable unnecessary triggers
-- add ciip_user_organisation connection if not set
-- refresh application data with truncate & create_application_mutation_chain
-- create 'submitted' applications for the analyst to view & diff
-- edit form results for versions 1&2 for diffing

begin;

-- Test init
select test_helper.mock_open_window();
select test_helper.modify_triggers('disable');

-- Create test users
select test_helper.create_test_users();

-- Create applications (and necessary facilities/organisations)
select test_helper.create_applications(1, True, True);

-- Create new revision for diffing
select ggircs_portal.create_application_revision_mutation_chain(1,1);

-- Certify application
select test_helper.certify_application(1,1,7);

-- Submit versions
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (1,1,'submitted');
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (1,2,'submitted');

select test_helper.initialize_all_form_result_data(application_id => 1, version_number => 1, seed => 0);
select test_helper.initialize_all_form_result_data(application_id => 1, version_number => 2, seed => 5);

commit;
