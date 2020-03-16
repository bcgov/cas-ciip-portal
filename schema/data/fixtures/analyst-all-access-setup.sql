begin;

alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.application_revision_status
  disable trigger _status_change_email;
alter table ggircs_portal.certification_url
  disable trigger _certification_request_email;
alter table ggircs_portal.certification_url
  disable trigger _signed_by_certifier_email;
alter table ggircs_portal.application_revision_status
  disable trigger _check_certification_signature_md5;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');
truncate ggircs_portal.application restart identity cascade;
select ggircs_portal.create_application_mutation_chain(1);
select ggircs_portal.create_application_mutation_chain(2);
update ggircs_portal.certification_url set certification_signature = 'signed' where application_id=2;
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (2,1,'submitted');

commit;
