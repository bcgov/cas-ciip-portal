begin;

alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_request_for_access_email;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_access_approved_email;
alter table ggircs_portal.application_revision_status
  disable trigger _status_change_email;
alter table ggircs_portal.certification_url
  disable trigger _certification_request_email;
alter table ggircs_portal.certification_url
  disable trigger _signed_by_certifier_email;
alter table ggircs_portal.application
  disable trigger _send_draft_application_email;
delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=8;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 8, 'approved');
truncate ggircs_portal.application restart identity cascade;
select ggircs_portal.create_application_mutation_chain(1);
update ggircs_portal.application_revision set legal_disclaimer_accepted = true where application_id=1 and version_number=1;

commit;
