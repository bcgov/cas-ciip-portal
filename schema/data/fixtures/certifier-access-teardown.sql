begin;


delete from ggircs_portal.certification_url where application_id=1;
alter table ggircs_portal.certification_url
  enable trigger _random_id;
alter table ggircs_portal.application_revision_status
  enable trigger _status_change_email;
alter table ggircs_portal.certification_url
  enable trigger _certification_request_email;
alter table ggircs_portal.certification_url
  enable trigger _signed_by_certifier_email;

commit;
