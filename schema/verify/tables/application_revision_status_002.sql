-- Verify ggircs-portal:tables/application_revision_status_002 on pg

begin;

do $$
  begin

    if (select exists(select * from pg_trigger where tgname='_create_or_refresh_review_step' and tgrelid='ggircs_portal.application_revision_status'::regclass)) then
      perform true;
    else
      raise exception 'trigger _create_or_refresh_review_step should exist on table ggircs_portal.application_revision_status';
    end if;

  end; $$;

rollback;
