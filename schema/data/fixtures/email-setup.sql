/**
  Delete old certification_url entries for application 2
  Disable trigger on ciip_user_organisation so we can insert
  Insert data in ciip_user_organisation so there is a connection between our user and the application
  set the legal disclaimer column to be true so we can skip the legal checks
  set created_by to 6 (ciip_reporter) so our user has row level access on application_revision & application_revision_status
**/

begin;

delete from ggircs_portal.certification_url where application_id=2;


select test_helper.modify_triggers('enable');
select test_helper.modify_triggers('disable', '{
  "ciip_user_organisation":["_set_user_id","_send_request_for_access_email", "_send_access_approved_email"],
  "application":["_send_draft_application_email"]
}');

delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=7;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');
truncate ggircs_portal.application restart identity cascade;
select ggircs_portal.create_application_mutation_chain(1);
select ggircs_portal.create_application_mutation_chain(2);
update ggircs_portal.application_revision set legal_disclaimer_accepted = true where application_id=2 and version_number=1;
update ggircs_portal.application_revision_status set created_by = 6 where application_id=2;
update ggircs_portal.application_revision set created_by = 6 where application_id=2;

-- Ensure all form results contain no errors by initializing them
-- application ID is 2 and version number is 1
select test_helper.initialize_all_form_result_data(
  application_id := 2,
  version_number := 1
);

commit;
