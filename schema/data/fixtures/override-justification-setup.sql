begin;

-- Init test
select test_helper.mock_open_window();
select test_helper.modify_triggers('enable');
do \$$
  declare disable_triggers json;
  begin
    disable_triggers := '
      {
        "application": ["_send_draft_application_email"],
        "certification_url": ["_signed_by_certifier_email", "_certification_request_email"],
        "application_revision_status": ["_status_change_email"],
        "ciip_user_organisation": ["_send_access_approved_email", "_send_request_for_access_email", "_set_user_id"]
      }
    ';
    perform test_helper.modify_triggers('disable', disable_triggers);
  end;
\$$;

-- Create test users
select test_helper.create_test_users();

-- Create applications (and necessary facilities/organisations)
select test_helper.create_applications(1, True, True);

-- Create approved user-organisation connection
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 1, 'approved');

-- Set legal disclaimer accepted true for application ID 1
update ggircs_portal.application_revision set legal_disclaimer_accepted = true where application_id=1 and version_number=1;

commit;
