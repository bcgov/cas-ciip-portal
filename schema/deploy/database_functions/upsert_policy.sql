-- Deploy ggircs-portal:database_functions/upsert_policy to pg
-- requires: database_functions/create_roles

begin;

-- upsert_policy function with 5 parameters is for select, insert, delete statements
-- and update operations where the using/with check statements are equal
create or replace function ggircs_portal.upsert_policy(policy_name text, table_name text, operation text, role_name text, using_check_statement text)
  returns void
  as
  $function$
    declare
      upsert text;
    begin
        -- If policy already exists alter policy, else create a new policy
        if (select 1 from pg_policies where policyname = policy_name and tablename = table_name and schemaname = 'ggircs_portal') then
          upsert := 'alter';
        else
          upsert := 'create';
        end if;

        -- case statement selections for the different operations
        -- (select/delete use a 'using' statement)
        -- (insert uses a 'with check' statement)
        -- (update uses both)
        case
          when (lower(operation) = 'select' or lower(operation) = 'delete') then
            execute format(upsert || ' policy ' || quote_ident(policy_name) ||
                          ' on ggircs_portal.' || quote_ident(table_name) || ' for ' || operation ||
                          ' to ' || quote_ident(role_name) ||
                          ' using(' || using_check_statement || ')');
          when (lower(operation) = 'insert') then
            execute format(upsert || ' policy ' || quote_ident(policy_name) ||
                          ' on ggircs_portal.' || quote_ident(table_name) || ' for ' || operation ||
                          ' to ' || quote_ident(role_name) ||
                          ' with check(' || using_check_statement || ')');
          when (lower(operation) = 'update') then
            execute format(upsert || ' policy ' || quote_ident(policy_name) ||
                          ' on ggircs_portal.' || quote_ident(table_name) || ' for ' || operation ||
                          ' to ' || quote_ident(role_name) ||
                          ' using(' || using_check_statement || ') with check(' || using_check_statement || ')');
          else
            raise exception 'Invalid operation variable. Must be one of [select, insert, update, delete]';
        end case;
    end;
  $function$
  language 'plpgsql' volatile;

-- upsert_policy with 6 parameters is for update operations where the using/with check statements are different
-- this version of the function requires 'using' and 'with check' to be defined in the using_statement and check_statement parameters
create or replace function ggircs_portal.upsert_policy(policy_name text, table_name text, operation text, role_name text, using_statement text, check_statement text)
  returns void
  as
  $function$
    declare
      upsert text;
    begin
      -- If policy already exists alter policy, else create a new policy
      if (select 1 from pg_policies where policyname = policy_name and tablename = table_name and schemaname = 'ggircs_portal') then
        upsert := 'alter';
      else
        upsert := 'create';
      end if;

      case
        when (lower(operation) = 'update') then
          execute format(upsert || ' policy ' || quote_ident(policy_name) ||
                        ' on ggircs_portal.' || quote_ident(table_name) || ' for ' || operation ||
                        ' to ' || quote_ident(role_name) ||
                        ' ' || using_statement || ' ' || check_statement);
        else
          raise exception 'invalid operation variable';
      end case;
    end;
  $function$
  language 'plpgsql' volatile;

commit;
