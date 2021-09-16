-- Verify ggircs-portal:tables/application_revision_status_003 on pg

begin;

do $$
  begin

    if (select exists(select * from pg_trigger where tgname='_restrict_old_application_submission' and tgrelid='ggircs_portal.application_revision_status'::regclass)) then
      perform true;
    else
      raise exception 'trigger _restrict_old_application_submission should exist on table ggircs_portal.application_revision_status';
    end if;

  end; $$;

rollback;
