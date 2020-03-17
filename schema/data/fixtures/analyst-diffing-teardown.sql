begin;

alter table ggircs_portal.ciip_user_organisation
  enable trigger _set_user_id;
alter table ggircs_portal.application_revision_status
  enable trigger _status_change_email;
alter table ggircs_portal.certification_url
  enable trigger _certification_request_email;
alter table ggircs_portal.certification_url
  enable trigger _signed_by_certifier_email;
alter table ggircs_portal.application_revision_status
  enable trigger _check_certification_signature_md5;
delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=7;

commit;
