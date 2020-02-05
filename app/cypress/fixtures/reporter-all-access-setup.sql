begin;

delete from ggircs_portal.certification_url where application_id=2;
update ggircs_portal.application_revision_status set application_revision_status = 'draft' where application_id=2 and version_number=1;
update ggircs_portal.application_revision set legal_disclaimer_accepted = false, certification_signature = null where application_id=2 and version_number=1;
disable trigger _random_id;
insert into ggircs_portal.certification_url (id, application_id, created_by, updated_by) overriding system value
  values ('9VffJN5AwC7Zg-NubS054rTBavdzaqUqP5cEXE1muyoyL-MfLLV_9TA6j1MZkW7Yq3oAy4wqe13E+
               | 06mE2YIa3w==', 2, 6, 6);
update ggircs_portal.certification_url set id = '9VffJN5AwC7Zg-NubS054rTBavdzaqUqP5cEXE1muyoyL-MfLLV_9TA6j1MZkW7Yq3oAy4wqe13E+
               | 06mE2YIa3w==' where application_id=2;

commit;
