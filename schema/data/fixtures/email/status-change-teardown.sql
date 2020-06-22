begin;

alter table ggircs_portal.ciip_user_organisation
  enable trigger _set_user_id;
alter table ggircs_portal.certification_url
  enable trigger _certification_request_email;
alter table ggircs_portal.certification_url
  enable trigger _signed_by_certifier_email;
alter table ggircs_portal.application
  enable trigger _send_draft_application_email;
alter table ggircs_portal.ciip_user_organisation
  enable trigger _send_request_for_access_email;
alter table ggircs_portal.ciip_user_organisation
  enable trigger _send_access_approved_email;

delete from ggircs_portal.certification_url where application_id=1;
delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=100;
delete from ggircs_portal.form_result_status where application_id=1;
delete from ggircs_portal.form_result where application_id=1;
delete from ggircs_portal.application_revision_status where application_id=1;
delete from ggircs_portal.application_revision where application_id=1;
delete from ggircs_portal.application where id=1;

delete from ggircs_portal.facility where id=100;
delete from ggircs_portal.organisation where id=100;

commit;
