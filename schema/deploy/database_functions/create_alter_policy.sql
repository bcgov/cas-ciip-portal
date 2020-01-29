-- Deploy ggircs-portal:database_functions/create_alter_policy to pg
-- requires: database_functions/create_roles

begin;

create or replace function ggircs_portal.create_alter_policy(create_alter text, policy_name text, table_name text, operation text, role_name text, using_statement text, check_statement text)
  returns void
  as
  $function$
    begin
        if (using_statement is null) then
          execute format(create_alter || ' policy ' || quote_ident(policy_name) ||
                        ' on ggircs_portal.' || quote_ident(table_name) || ' for ' || operation ||
                        ' to ' || quote_ident(role_name) ||
                        ' with check(' || check_statement || ')');
        elsif (check_statement is null) then
          execute format(create_alter || ' policy ' || quote_ident(policy_name) ||
                        ' on ggircs_portal.' || quote_ident(table_name) || ' for ' || operation ||
                        ' to ' || quote_ident(role_name) ||
                        ' using(' || using_statement || ')');
        else
          execute format(create_alter || ' policy ' || quote_ident(policy_name) ||
                        ' on ggircs_portal.' || quote_ident(table_name) || ' for ' || operation ||
                        ' to ' || quote_ident(role_name) ||
                        ' using(' || using_statement || ') with check(' || check_statement || ')');
        end if;
    end;
  $function$
  language 'plpgsql' volatile;


commit;
