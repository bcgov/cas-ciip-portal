begin;

-- Init test environment
select test_helper.mock_open_window();
select test_helper.modify_triggers('enable');
select test_helper.modify_triggers('disable','{
  "ciip_user_organisation" : ["_set_user_id","_send_request_for_access_email","_send_access_approved_email"],
  "certification_url" : ["_certification_request_email", "_signed_by_certifier_email"],
  "application" : ["_send_draft_application_email"]
}');

-- Create test users
select test_helper.create_test_users();

-- Create application
select test_helper.create_applications(1, True, True);

-- Create approved user-org connection
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 1, 'approved');

-- Update created by values & submit application
update ggircs_portal.application_revision_status set created_by = 6 where application_id=1;
update ggircs_portal.application_revision set created_by = 6 where application_id=1;
update ggircs_portal.application_revision_status set application_revision_status = 'submitted' where application_id=1;

commit;
