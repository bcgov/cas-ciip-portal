-- disable unnecessary triggers
-- add ciip_user_organisation connection if not set
-- refresh application data with truncate & create_application_mutation_chain
-- set legal-disclaimer to false to trigger legal checkbox pages
-- update form_result data so that there are no errors & reporter can move through all pages

begin;

select test_helper.modify_triggers('enable');

do \$$
  declare disable_triggers json;
  begin
    disable_triggers := '
      {
        "application": ["_send_draft_application_email"],
        "certification_url": ["_100_timestamps", "_random_id", "_signed_by_certifier_email", "_certification_request_email"],
        "application_revision_status": ["_status_change_email"],
        "ciip_user_organisation": ["_send_access_approved_email", "_send_request_for_access_email", "_set_user_id"]
      }
    ';
    perform test_helper.modify_triggers('disable', disable_triggers);
  end;
\$$;

truncate ggircs_portal.certification_url restart identity cascade;
truncate ggircs_portal.application restart identity cascade;
select ggircs_portal.create_application_mutation_chain(1);
select ggircs_portal.create_application_mutation_chain(2);

-- Ensure products referenced in form_result are in the database
truncate ggircs_portal.product restart identity cascade;


select test_helper.create_product(id => 26, product_name => 'Coal', units => 'tonnes', product_state => 'published');
select test_helper.create_product(id => 29, product_name => 'Other Pulp (Mechanical pulp, paper, newsprint)', units => 'bone-dry tonnes', product_state => 'published');

select test_helper.initialize_all_form_result_data(1,1);
select test_helper.initialize_all_form_result_data(2,1);

insert into ggircs_portal.certification_url(id, certifier_url, created_by, application_id, version_number, send_certification_request, certifier_email)
overriding system value
values ('testpage', 'localhost:3004/certifier/certification-redirect?rowId=testpage', 6, 1, 1, false, 'CERTIFIER@certi.fy');

insert into ggircs_portal.certification_url(id, certifier_url, created_by, application_id, version_number, send_certification_request, certifier_email)
overriding system value
values ('anothertest', 'localhost:3004/certifier/certification-redirect?rowId=anothertest', 6, 2, 1, false, 'CERTIFIER@certi.fy');

commit;
