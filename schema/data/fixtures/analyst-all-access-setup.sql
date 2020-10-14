begin;

-- Init test environment
select test_helper.mock_open_window();
select test_helper.modify_triggers('disable');

-- Create test users
select test_helper.create_test_users();

-- Create applications (and necessary facilities/organisations)
select test_helper.create_applications(2, False, True);

-- Modify application #2 to be 'submitted'
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (2,1,'submitted');

commit;
