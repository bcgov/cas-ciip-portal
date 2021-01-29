-- Deploy ggircs-portal:database_functions/create_portal_app_user to pg
-- requires: database_functions/create_roles

begin;
do $$
  begin
    execute format('revoke all privileges on database %I from portal_app', current_database());
  end;
$$;

drop user portal_app;

commit;
