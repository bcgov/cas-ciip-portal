begin;

delete from ggircs_portal.certification_url where application_id=1;

alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.certification_url
  disable trigger _certification_request_email;
alter table ggircs_portal.certification_url
  disable trigger _signed_by_certifier_email;
alter table ggircs_portal.application
  disable trigger _send_draft_application_email;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_request_for_access_email;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_access_approved_email;
alter table ggircs_portal.application_revision_status
  enable trigger _status_change_email;

delete from ggircs_portal.organisation where id=100;
insert into ggircs_portal.organisation(id, operator_name) overriding system value values (100, 'MacDonalds Agriculture, Ltd.');

delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=100;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 100, 'approved');

delete from ggircs_portal.facility where id=100;
insert into ggircs_portal.facility(id, organisation_id, facility_name) overriding system value values (100, 100, 'Farm');

truncate ggircs_portal.application restart identity cascade;

select ggircs_portal.create_application_mutation_chain(100);

update ggircs_portal.application_revision_status set created_by = 6 where application_id=1;
update ggircs_portal.application_revision set created_by = 6 where application_id=1;
update ggircs_portal.application_revision_status set application_revision_status = 'submitted' where application_id=1;

commit;
