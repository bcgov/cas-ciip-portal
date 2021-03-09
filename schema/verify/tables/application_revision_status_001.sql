-- Verify ggircs-portal:tables/application_revision_status_001 on pg

begin;

do $$
  begin

    if (select exists(select * from pg_trigger where tgname='_check_certification_signature_md5' and tgrelid='ggircs_portal.application_revision_status'::regclass)) then
      raise exception 'trigger _check_certification_signature_md5 exists on ggircs_portal.application_revision_status when it should not';
    else
      perform true;
    end if;

  end; $$;

rollback;
