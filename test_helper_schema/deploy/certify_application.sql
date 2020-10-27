-- Deploy test_helpers:certify_application to pg
-- requires: schema_test_helper

begin;

  create or replace function test_helper.certify_application(app_id int, v_number int, certifier_id int)
  returns void as
  $function$
    declare generated_id varchar(1000);
    begin

      generated_id := encode(gen_random_bytes(64), 'base64');
    -- Base64 encoding contains 2 URL unsafe characters by default.
    -- The URL-safe version has these replacements.
      generated_id := replace(generated_id, '/', '_'); -- url safe replacement
      generated_id := replace(generated_id, '+', '-'); -- url safe replacement

      insert into ggircs_portal.certification_url (
        id,
        application_id,
        version_number,
        certification_signature,
        certified_by,
        certified_at,
        certifier_email)
      values(
        generated_id,
        app_id,
        v_number,
        '\x7369676e6564',
        certifier_id,
        now(),
        (select email_address from ggircs_portal.ciip_user where id=certifier_id)
      );

    end;

  $function$ language plpgsql volatile;

commit;
