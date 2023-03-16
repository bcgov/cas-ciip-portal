begin;

-- Mock time for the test
select mocks.set_mocked_time_in_transaction('2099-02-02 00:01:00.000000-07'::timestamptz);

-- Init test environment
select test_helper.mock_open_window();
select test_helper.modify_triggers('disable');

-- Create test users
select test_helper.create_test_users();

-- Create applications (and necessary facilities/organisations)
select test_helper.create_applications(4, False, True);

-- Modify application #1-3 to be 'submitted', 4 stays in draft
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status, created_at)
  values (1,1,'submitted', now() + interval '1 minute');
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status, created_at)
  values (2,1,'submitted', now() + interval '1 minute');
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status, created_at)
  values (3,1,'approved', now() + interval '1 minute');


-- Create organisation access requests
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status)
  values (1, 1, 'approved');
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status)
  values (2, 1, 'rejected');
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, bceid_business_name, status)
  values (2, 3, 'from bceid', 'approved');
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status)
  values (6, 2, 'approved');
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status)
  values (6, 3, 'pending');

select test_helper.modify_triggers('enable');

commit;
