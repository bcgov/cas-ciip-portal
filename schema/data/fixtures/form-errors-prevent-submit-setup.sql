-- disable _set_user_id trigger so a value can be inserted in the ciip_user_organisation table
-- insert an 'approved' row in ciip_user_organisation so our cypress_test_reporter has access the the application we are testing (id=2)
-- refresh application data with truncate & create_application_mutation_chain
-- set legal_disclaimer_accepted=true so we can bypass the legal checkboxes & go right to the summary page

begin;

-- Init test
select test_helper.mock_open_window();
select test_helper.modify_triggers('disable');

-- Create test users
select test_helper.create_test_users();

-- Create applications (and necessary facilities/organisations)
select test_helper.create_applications(1, True, True);

-- Create approved user-organisationm connection
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 1, 'approved');

-- Set legal disclaimer accepted = true
update ggircs_portal.application_revision set legal_disclaimer_accepted = true where application_id=1 and version_number=1;

commit;
