-- disable unnecessary triggers
-- add ciip_user_organisation connection if not set
-- refresh application data with truncate & create_application_mutation_chain
-- create a 'submitted' application for the analyst to view

begin;

select test_helper.mock_open_window();
select test_helper.modify_triggers('disable');

-- Create test users
insert into ggircs_portal.ciip_user (id, uuid, first_name, last_name, email_address, occupation, phone_number)
overriding system value
values
  (1, '6c01258f-6ad8-4790-8ccc-485163f122a5' , 'Douglas', 'Fir', 'Douglas.Fir@hhry.xxx', 'Tree', '123456789'),
  (2, 'ca716545-a8d3-4034-819c-5e45b0e775c9' , 'Argus', 'Filch', 'argus@squibs.hp', 'Custodian', '123456789'),
  (3, '00000000-0000-0000-0000-000000000000', 'Test', 'User', 'ciip@mailinator.com', 'Unauthenticated User', '123456789'),
  (4, 'eabdeef2-f95a-4dd5-9908-883b45d213ba', 'Cypress', 'Admin', 'ciip-admin@mailinator.com', 'Cypress Admin', '123456789'),
  (5, '9e96cf52-9316-434e-878d-2d926a80ac8f', 'Cypress', 'Analyst', 'ciip-analyst@mailinator.com', 'Cypress Analyst', '123456789'),
  (6, '809217a1-34b8-4179-95bc-6b4410b4fe16', 'Cypress', 'Reporter', 'ciip-reporter@mailinator.com', 'Cypress Reporter', '123456789'),
  (7, '15a21af2-ce88-42e6-ac90-0a5e24260ec6', 'Cypress', 'Certifier', 'certifier@certi.fy', 'Cypress Certifier', '123456789');

-- *1* CIIP_USER_ORGANISATION
insert into ggircs_portal.organisation(id, report_id, swrs_report_id, swrs_organisation_id, operator_name, cra_business_number)
overriding system value
values
(7, 3, 562237, 8469, 'Fvothac Tdazlefag Ltd.', 670654234),
(8,2,841830,9308,'Nckgmvysf, Inc.',856930160);

insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');
-- end *1*

insert into ggircs_portal.facility(id, organisation_id, facility_name, bcghgid)
overriding system value
values
(1,8,'Ftavhrcsu',43680338846),
(2,7,'Aafjfj',95333895918);



select ggircs_portal.create_application_mutation_chain(1);
select ggircs_portal.create_application_mutation_chain(2);
end;

-- *2* CERTIFICATION_URL

-- update ggircs_portal.certification_url set certification_signature = 'signed' where application_id=2;
insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
  values (2,1,'submitted');

-- delete from ggircs_portal.ciip_user_organisation where user_id=6 and organisation_id=7;
-- insert into ggircs_portal.ciip_user_organisation(user_id, organisation_id, status) values (6, 7, 'approved');
-- truncate ggircs_portal.application restart identity cascade;
-- select ggircs_portal.create_application_mutation_chain(1);
-- select ggircs_portal.create_application_mutation_chain(2);
-- update ggircs_portal.certification_url set certification_signature = 'signed' where application_id=2;
-- insert into ggircs_portal.application_revision_status(application_id, version_number, application_revision_status)
--   values (2,1,'submitted');

commit;
