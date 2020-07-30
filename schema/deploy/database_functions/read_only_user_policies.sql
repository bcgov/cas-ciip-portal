-- Deploy ggircs-portal:database_functions/read_only_user_policies to pg
-- requires: schema_ggircs_portal
-- requires: schema_ggircs_portal_private

begin;

create or replace function ggircs_portal_private.read_only_user_policies(ciip_read_only_user text)--ggircs_portal_private.read_only_user_policies()
returns void as $function$
  declare
    declare
    ciip_table record;
    policy_prefix text;
    policy_name text;
    create_policy_statement text;
  begin
    for ciip_table in
      select table_name::text from information_schema.tables
      where table_schema = 'ggircs_portal'
      and table_type = 'BASE TABLE'
    loop
      policy_name:=concat(ciip_read_only_user, '_select_', ciip_table.table_name);

      if (select not exists(select polname from pg_policy where polname=policy_name)) then
        create_policy_statement:=concat('create policy ', policy_name, ' on ggircs_portal.', ciip_table.table_name, ' for select to ', ciip_read_only_user, ' using (true)');
        execute create_policy_statement;
      else
        raise notice 'POLICY: % already exists. Policy not created.', policy_name;
      end if;

    end loop;
  end;
$function$ language plpgsql;

commit;
