-- disable unnecessary triggers
-- create connection to application via ciip_user_organisation
-- ensure each production form is blank before each test

begin;

alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_request_for_access_email;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _send_access_approved_email;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');

update ggircs_portal.form_result set form_result = '[{}]' where id=12;

commit;
