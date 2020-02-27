begin;

delete from ggircs_portal.certification_url where application_id=2;
alter table ggircs_portal.ciip_user_organisation
  disable trigger _set_user_id;
alter table ggircs_portal.application_revision_status
  disable trigger _status_change_email;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');
update ggircs_portal.application_revision_status set application_revision_status = 'draft' where application_id=2 and version_number=1;
update ggircs_portal.application_revision set legal_disclaimer_accepted = false where application_id=2 and version_number=1;
disable trigger _random_id;
insert into ggircs_portal.certification_url (id, application_id, version_number, form_results_md5, created_by, updated_by) overriding system value
  values ('9VffJN5AwC7Zg-NubS054rTBavdzaqUqP5cEXE1muyoyL-MfLLV_9TA6j1MZkW7Yq3oAy4wqe13E+
               | 06mE2YIa3w==', '\x6265663063396464663738383462666264623137356661313137323762326333'::bytea, 2, 1, 6, 6);

commit;
