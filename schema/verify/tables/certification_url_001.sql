-- Verify ggircs-portal:tables/certification_url_001 on pg

BEGIN;

do $$
  begin

    if (select exists(select * from pg_trigger where tgname='_certification_request_email' and tgrelid='ggircs_portal.certification_url'::regclass)) then
      raise exception 'trigger _certification_request_email exists on ggircs_portal.certification_url when it should not';
    else
      perform true;
    end if;

    if (select exists(select * from pg_trigger where tgname='_signed_by_certifier_email' and tgrelid='ggircs_portal.certification_url'::regclass)) then
      raise exception 'trigger _signed_by_certifier_email exists on ggircs_portal.certification_url when it should not';
    else
      perform true;
    end if;

    if (select exists(select * from pg_trigger where tgname='_recertification_request' and tgrelid='ggircs_portal.certification_url'::regclass)) then
      raise exception 'trigger _recertification_request exists on ggircs_portal.certification_url when it should not';
    else
      perform true;
    end if;

    if (select exists(select * from pg_trigger where tgname='_create_form_result_md5' and tgrelid='ggircs_portal.certification_url'::regclass)) then
      raise exception 'trigger _create_form_result_md5 exists on ggircs_portal.certification_url when it should not';
    else
      perform true;
    end if;

    if (select exists(select * from pg_trigger where tgname='_check_form_result_md5' and tgrelid='ggircs_portal.certification_url'::regclass)) then
      raise exception 'trigger _check_form_result_md5 exists on ggircs_portal.certification_url when it should not';
    else
      perform true;
    end if;

  end;
$$;


ROLLBACK;
