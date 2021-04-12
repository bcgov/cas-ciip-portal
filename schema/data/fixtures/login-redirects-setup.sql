-- Because some views have required query params, there needs to be existing data on that page to test the final redirect.
-- Creates an organisation with a facility and relates that org to a reporter user

begin;

-- Init test
select test_helper.mock_open_window();
select test_helper.modify_triggers('disable');

-- Create test users
select test_helper.create_test_users();

-- Create applications (and necessary facilities/organisations)
select test_helper.create_applications(3, True, True);

-- Set legal disclaimer accepted to true
update ggircs_portal.application_revision set legal_disclaimer_accepted = 'true' where application_id = 1 and version_number = 1;
update ggircs_portal.application_revision set legal_disclaimer_accepted = 'true' where application_id = 2 and version_number = 1;
update ggircs_portal.application_revision set legal_disclaimer_accepted = 'true' where application_id = 3 and version_number = 1;

-- Submit application
update ggircs_portal.application_revision_status set application_revision_status = 'submitted' where application_id = 3 and version_number = 1;

commit;
