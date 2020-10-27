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

-- Create org & facilitiy manually as a report_id needs to be set in order to get a swrs version to diff on
insert into ggircs_portal.organisation(report_id, swrs_report_id, swrs_organisation_id, operator_name, cra_business_number)
  values (1, 1, 1, 'test_organisation', 100000000);
insert into ggircs_portal.facility(organisation_id, facility_name, report_id, bcghgid)
  values (1, (select concat('test_organisation_facility_', '1')), 1, 10000);

-- Create application
select test_helper.create_applications(1, True, False);

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
