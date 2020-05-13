/**
  Adds some dummy users.
  User 3: Test User is used when running yarn dev with the -NO_AUTH flag
*/

begin;

alter table ggircs_portal.ciip_user disable trigger _welcome_email;

with rows as (
insert into ggircs_portal.ciip_user (id, uuid, first_name, last_name, email_address, occupation, phone_number)
overriding system value
values
  (1, '6c01258f-6ad8-4790-8ccc-485163f122a5' , 'Douglas', 'Fir', 'Douglas.Fir@hhry.xxx', 'Tree', '123456789'),
  (2, 'ca716545-a8d3-4034-819c-5e45b0e775c9' , 'Argus', 'Filch', 'argus@squibs.hp', 'Custodian', '123456789'),
  (3, '00000000-0000-0000-0000-000000000000', 'Test', 'User', 'ciip@mailinator.com', 'Unauthenticated User', '123456789'),
  (4, 'eabdeef2-f95a-4dd5-9908-883b45d213ba', 'Cypress', 'Admin', 'ciip-admin@mailinator.com', 'Cypress Admin', '123456789'),
  (5, '9e96cf52-9316-434e-878d-2d926a80ac8f', 'Cypress', 'Analyst', 'ciip-analyst@mailinator.com', 'Cypress Analyst', '123456789'),
  (6, '809217a1-34b8-4179-95bc-6b4410b4fe16', 'Cypress', 'Reporter', 'ciip-reporter@mailinator.com', 'Cypress Reporter', '123456789'),
  (7, '15a21af2-ce88-42e6-ac90-0a5e24260ec6', 'Cypress', 'Certifier', 'certifier@certi.fy', 'Cypress Certifier', '123456789')

on conflict(id) do update set
  uuid=excluded.uuid,
  first_name=excluded.first_name,
  last_name=excluded.last_name,
  email_address=excluded.email_address,
  occupation=excluded.occupation,
  phone_number=excluded.phone_number
returning 1
) select 'Inserted ' || count(*) || ' rows into ggircs_portal.ciip_user' from rows;

select setval from
setval('ggircs_portal.ciip_user_id_seq', (select max(id) from ggircs_portal.ciip_user), true)
where setval = 0;

alter table ggircs_portal.ciip_user enable trigger _welcome_email;

commit;
