begin;

-- Init test environment
select test_helper.mock_open_window();

-- Create test users
select test_helper.create_test_users();

select test_helper.modify_triggers('enable');
select test_helper.modify_triggers('disable','{
  "ciip_user_organisation" : ["_set_user_id","_send_request_for_access_email","_send_access_approved_email"]
}');

-- Create application
select test_helper.create_applications(3, True, True);

-- Create approved user-org connection
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 1, 'approved');

-- Update created by values & submit application
update ggircs_portal.application_revision set created_by = 6 where application_id=1;
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status) values(1, 1, 'submitted');
update ggircs_portal.application_review_step set is_complete=true where application_id=1;

update ggircs_portal.application_revision set created_by = 6 where application_id=2;
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status) values(2, 1, 'submitted');
update ggircs_portal.application_review_step set is_complete=true where application_id=2;

update ggircs_portal.application_revision set created_by = 6 where application_id=3;
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status) values(3, 1, 'submitted');
update ggircs_portal.application_review_step set is_complete=true where application_id=3;

commit;
