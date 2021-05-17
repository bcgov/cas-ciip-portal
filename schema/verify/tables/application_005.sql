-- Verify ggircs-portal:tables/application_005 on pg

begin;

do $$
  begin

    if (select exists(select * from pg_trigger t
        join pg_class c
        on t.tgrelid = c.oid
        and c.relname = 'application'
        and t.tgname = '_send_draft_application_email')) then
      raise exception '_send_draft_application_email trigger exists on application table when it should not';
    else
      perform true;
    end if;

  end;
$$;

rollback;
