begin;

update ggircs_portal.application_revision_status set application_revision_status = 'draft' where application_id=2 and version_number=1;
update ggircs_portal.application_revision set legal_disclaimer_accepted = false where application_id=2 and version_number=1;
delete from ggircs_portal.certification_url where application_id=2;
alter table ggircs_portal.certification_url
  enable trigger _random_id;
delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=7;
alter table ggircs_portal.ciip_user_organisation
  enable trigger _set_user_id;
alter table ggircs_portal.application_revision_status
  enable trigger _status_change_email;
alter table ggircs_portal.certification_url
  enable trigger _certification_request_email;
alter table ggircs_portal.certification_url
  enable trigger _signed_by_certifier_email;
alter table ggircs_portal.ciip_user_organisation
  enable trigger _send_request_for_access_email;
alter table ggircs_portal.ciip_user_organisation
  enable trigger _send_access_approved_email;
alter table ggircs_portal.application
  enable trigger _send_draft_application_email;

commit;
