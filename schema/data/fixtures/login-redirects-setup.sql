-- Because some views have required query params, there needs to be existing data on that page to test the final redirect.
-- Creates an organisation with a facility and relates that org to a reporter user

begin;

-- alter table ggircs_portal.ciip_user_organisation
--   disable trigger _set_user_id;
-- alter table ggircs_portal.ciip_user_organisation
--   disable trigger _send_request_for_access_email;
-- alter table ggircs_portal.ciip_user_organisation
--   disable trigger _send_access_approved_email;

-- alter table ggircs_portal.application
--   disable trigger _send_draft_application_email;

-- alter table ggircs_portal.form_result
--   disable trigger _100_timestamps;

-- -- Make it possible to set our own certification_url id:
-- alter table ggircs_portal.certification_url
--   disable trigger _random_id;
-- -- Disable certification emails:
-- alter table ggircs_portal.certification_url
--   disable trigger _certification_request_email;
-- alter table ggircs_portal.certification_url
--   disable trigger _signed_by_certifier_email;
-- alter table ggircs_portal.certification_url
--   disable trigger _recertification_request;

select test_helper.modify_triggers('disable');

-- Truncate any existing applications in order to create our own with known ids:
truncate ggircs_portal.application restart identity cascade;
truncate ggircs_portal.form_result restart identity cascade;

-- Creates an organisation and sets up test reporter with access:
delete from ggircs_portal.organisation where id = 200;
insert into ggircs_portal.organisation(id, operator_name) overriding system value values (200, 'MacDonalds Agriculture, Ltd.');
delete from ggircs_portal.ciip_user_organisation where user_id = 6 and organisation_id = 200;
insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 200, 'approved');

-- Creates a draft application for testing the /reporter/application, /reporter/new-application-disclaimer and /reporter/view-application pages
delete from ggircs_portal.facility where id = 100;
insert into ggircs_portal.facility(id, organisation_id, facility_name) overriding system value values (100, 200, 'Farm');
select ggircs_portal.create_application_mutation_chain(100);
update ggircs_portal.application_revision set legal_disclaimer_accepted = 'true' where application_id = 1 and version_number = 1;
update ggircs_portal.application_revision set created_by = 6 where application_id = 1 and version_number = 1;

-- Creates an application for testing /certifier/certification-redirect and /certifier/certify
delete from ggircs_portal.facility where id = 111;
insert into ggircs_portal.facility(id, organisation_id, facility_name) overriding system value values (111, 200, 'Feed Factory');
select ggircs_portal.create_application_mutation_chain(111);
update ggircs_portal.application_revision set legal_disclaimer_accepted = 'true' where application_id = 2 and version_number = 1;
update ggircs_portal.application_revision set created_by = 6 where application_id = 2 and version_number = 1;

-- Creates a submitted application for testing /analyst/application-review
delete from ggircs_portal.facility where id = 122;
insert into ggircs_portal.facility(id, organisation_id, facility_name) overriding system value values (122, 200, 'Feed Factory');
select ggircs_portal.create_application_mutation_chain(122);
update ggircs_portal.application_revision set legal_disclaimer_accepted = 'true' where application_id = 3 and version_number = 1;
update ggircs_portal.application_revision set created_by = 6 where application_id = 3 and version_number = 1;

-- Create certification request for two of the applications
-- Problem? created_by is not set successfully
insert into ggircs_portal.certification_url(id, application_id, version_number, certifier_email, send_certification_request) values ('sss999', 2, 1, 'certifier@certi.fy', 'false');
insert into ggircs_portal.certification_url(id, application_id, version_number, certifier_email, send_certification_request) values ('zzz888', 3, 1, 'certifier@certi.fy', 'false');
update ggircs_portal.certification_url set created_by = 6 where application_id = 2;
update ggircs_portal.certification_url set created_by = 6 where application_id = 3;

-- Submit one of the applications
update ggircs_portal.certification_url set certification_signature = 'signed' where application_id = 3 and version_number = 1;
update ggircs_portal.application_revision_status set application_revision_status = 'submitted' where application_id = 3 and version_number = 1;

commit;
