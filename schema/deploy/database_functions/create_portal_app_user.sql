-- Deploy ggircs-portal:database_functions/create_portal_app_user to pg
-- requires: database_functions/create_roles

begin;
do $$
  begin
    execute format('revoke all privileges on database %I from portal_app', current_database());

    if not exists (
    select true
    from   pg_catalog.pg_roles
    where  rolname = 'ciip_portal') then

    create user ciip_portal;
    end if;

    grant ciip_administrator, ciip_analyst, ciip_industry_user, ciip_guest to ciip_portal;
    execute format('grant create, connect on database %I to ciip_portal', current_database());
  end;
$$;

drop user portal_app;

commit;
