-- Deploy ggircs-portal:database_functions/create_portal_app_user to pg
-- requires: database_functions/create_roles

begin;

do
$$
begin
  if not exists (
    select true
    from   pg_catalog.pg_roles
    where  rolname = 'portal_app') then

    create user portal_app;
  end if;

  grant ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest to portal_app;
  execute format('grant create, connect on database %I to portal_app', current_database());
end;
$$;

commit;
