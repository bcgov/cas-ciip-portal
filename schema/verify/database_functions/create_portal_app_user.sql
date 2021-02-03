-- Verify ggircs-portal:database_functions/create_portal_app_user on pg

begin;

do
  $$
  begin

    if
      not exists (select true from pg_roles where rolname='portal_app')
      and
      exists (select true from pg_roles where rolname ='ciip_portal') then
        perform true;
    else
      raise exception 'portal_app role exists when it should not or ciip_portal role does not exist when it should';
    end if;

  end;
$$;

rollback;
