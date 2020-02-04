-- Deploy ggircs-portal:database_functions/verify_policy to pg
-- requires: schema_ggircs_portal

begin;

-- Verifies if a policy exists
  create or replace function ggircs_portal_private.verify_policy(operation text, policy_name text, table_name_input text, role_name text)
  returns boolean
  as
  $function$
    declare
      valid_operations text[] := ARRAY['select', 'insert', 'update', 'delete', 'all'];
      table_oid oid;
      role_oid oid;
      operation_cmd_char char;
      policy_exists boolean;

    begin
      -- Test for valid operation input
      if (lower(operation) != all (valid_operations)) then
        raise exception 'invalid operation variable. Must be one of [select, insert, update, delete, all]';
      end if;

      -- Parse operation into the appropriate polcmd char in pg_policy table
      case
        when lower(operation) = 'select' then
          operation_cmd_char = 'r';
        when lower(operation) = 'insert' then
          operation_cmd_char = 'a';
        when lower(operation) = 'update' then
          operation_cmd_char = 'w';
        when lower(operation) = 'delete' then
          operation_cmd_char = 'd';
        when lower(operation) = 'all' then
          operation_cmd_char = '*';
      end case;

      -- Get the table OID
      execute format(
        $$
          select 'ggircs_portal.%s'::regclass::oid
        $$, table_name_input) into table_oid;
      -- Get the role OID
      execute format($$ select oid from pg_roles where rolname='%s' $$, role_name) into role_oid;

      -- Determine if policy exists with correct policy name, operation, role and table
      select exists(
        select * from pg_policy
          where polname = policy_name
          and polcmd = operation_cmd_char
          and polroles = ARRAY[role_oid]
          and polrelid = table_oid
      ) into policy_exists;

      -- Throw exception if false (necessary for sqitch)
      if (policy_exists = false) then
        raise exception 'Policy % on operation % on table % for role % does not exist', policy_name, operation, table_name_input, role_name;
      end if;
      -- Else return true
      return policy_exists;
    end;
  $function$
  language 'plpgsql' stable;

  comment on function ggircs_portal_private.verify_policy(text, text, text, text) is 'A generic function for testing the existence of policies on a table';

  commit;
