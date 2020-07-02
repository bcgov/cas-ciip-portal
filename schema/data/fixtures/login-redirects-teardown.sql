begin;

drop function if exists e2e_test_initialize_form;

alter table ggircs_portal.ciip_user_organisation
  enable trigger _set_user_id;
alter table ggircs_portal.ciip_user_organisation
  enable trigger _send_request_for_access_email;
alter table ggircs_portal.ciip_user_organisation
  enable trigger _send_access_approved_email;

alter table ggircs_portal.application
  enable trigger _send_draft_application_email;

alter table ggircs_portal.form_result
  enable trigger _100_timestamps;

-- Re-enable random id on certification_url:
alter table ggircs_portal.certification_url
  enable trigger _random_id;
-- Re-enable certification emails:
alter table ggircs_portal.certification_url
  enable trigger _certification_request_email;
alter table ggircs_portal.certification_url
  enable trigger _signed_by_certifier_email;
alter table ggircs_portal.certification_url
  enable trigger _recertification_request;

-- Delete records related to first application:
delete from ggircs_portal.form_result_status where application_id = 1;
delete from ggircs_portal.form_result where application_id = 1;
delete from ggircs_portal.application_revision_status where application_id = 1;
delete from ggircs_portal.application_revision where application_id = 1;
delete from ggircs_portal.application where id = 1;
delete from ggircs_portal.facility where id = 100;

-- Delete records related to second application:
delete from ggircs_portal.form_result_status where application_id = 2;
delete from ggircs_portal.form_result where application_id = 2;
delete from ggircs_portal.certification_url where application_id = 2;
delete from ggircs_portal.application_revision_status where application_id = 2;
delete from ggircs_portal.application_revision where application_id = 2;
delete from ggircs_portal.application where id = 2;
delete from ggircs_portal.facility where id = 111;

-- Delete records related to third application:
delete from ggircs_portal.form_result_status where application_id = 3;
delete from ggircs_portal.form_result where application_id = 3;
delete from ggircs_portal.certification_url where application_id = 3;
delete from ggircs_portal.application_revision_status where application_id = 3;
delete from ggircs_portal.application_revision where application_id = 3;
delete from ggircs_portal.application where id = 3;
delete from ggircs_portal.facility where id = 122;

-- Delete organisation and relationship with user:
delete from ggircs_portal.ciip_user_organisation where user_id = 6 and organisation_id = 200;
delete from ggircs_portal.organisation where id = 200;

commit;
