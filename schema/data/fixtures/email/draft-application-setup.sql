begin;

alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_request_for_access_email;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_access_approved_email;
alter table ggircs_portal.application
  enable trigger _send_draft_application_email;

-- Also create an organisation!
delete from ggircs_portal.organisation where id = 200;
insert into ggircs_portal.organisation(id, operator_name) overriding system value values (200, 'MacDonalds Agriculture, Ltd.');
delete from ggircs_portal.facility where id = 100;
insert into ggircs_portal.facility(id, organisation_id, facility_name) overriding system value values (100, 200, 'Farm');
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 200, 'approved');

commit;
