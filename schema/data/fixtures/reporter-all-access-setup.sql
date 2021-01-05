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
select test_helper.create_applications(2, True, True);

-- Create approved user-organisation connection
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 1, 'approved');

-- Create 2018 reporting year
insert into ggircs_portal.reporting_year(reporting_year, reporting_period_start, reporting_period_end, swrs_deadline, application_open_time, application_close_time)
overriding system value
values
(2018, '2018-01-01 00:00:00.0-08', '2018-12-31 23:59:59.0-08', '2019-06-01 00:00:00.000000-07', '2019-04-01 14:49:54.191757-07', '2019-12-30 14:49:54.191757-08');

-- Ensure products referenced in form_result are in the database
select test_helper.create_product(product_id => 26, product_name => 'Coal', units => 'tonnes', product_state => 'published');
select test_helper.create_product(product_id => 29, product_name => 'Other Pulp (Mechanical pulp, paper, newsprint)', units => 'bone-dry tonnes', product_state => 'published');

-- Ensure all form results contain no errors in application with ID 2
select test_helper.initialize_all_form_result_data(2,1);

commit;
