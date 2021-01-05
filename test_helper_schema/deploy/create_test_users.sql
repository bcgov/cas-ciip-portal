-- Deploy test_helpers:create_test_users to pg
-- requires: schema_test_helper

-- Creates a default set of test users
begin;

  create or replace function test_helper.create_test_users()
  returns void as
  $function$
    begin

      insert into ggircs_portal.ciip_user (uuid, first_name, last_name, email_address, occupation, phone_number)
      values
        ('6c01258f-6ad8-4790-8ccc-485163f122a5' , 'Douglas', 'Fir', 'Douglas.Fir@hhry.xxx', 'Tree', '123456789'),
        ('ca716545-a8d3-4034-819c-5e45b0e775c9' , 'Argus', 'Filch', 'argus@squibs.hp', 'Custodian', '123456789'),
        ('00000000-0000-0000-0000-000000000000', 'Test', 'User', 'ciip@mailinator.com', 'Unauthenticated User', '123456789'),
        ('eabdeef2-f95a-4dd5-9908-883b45d213ba', 'Cypress', 'Admin', 'ciip-admin@mailinator.com', 'Cypress Admin', '123456789'),
        ('9e96cf52-9316-434e-878d-2d926a80ac8f', 'Cypress', 'Analyst', 'ciip-analyst@mailinator.com', 'Cypress Analyst', '123456789'),
        ('809217a1-34b8-4179-95bc-6b4410b4fe16', 'Cypress', 'Reporter', 'ciip-reporter@mailinator.com', 'Cypress Reporter', '123456789'),
        ('15a21af2-ce88-42e6-ac90-0a5e24260ec6', 'Cypress', 'Certifier', 'certifier@certi.fy', 'Cypress Certifier', '123456789')
      on conflict(uuid) do update set
        first_name=excluded.first_name,
        last_name=excluded.last_name,
        email_address=excluded.email_address,
        occupation=excluded.occupation,
        phone_number=excluded.phone_number;

    end;

  $function$ language plpgsql volatile;

commit;
