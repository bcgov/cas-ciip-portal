-- Deploy ggircs-portal:database_functions/verify_policy_not_present to pg

BEGIN;


-- Verifies if a policy exists
  create or replace function ggircs_portal_private.verify_policy_not_present(policy_name text, table_name text)
  returns boolean
  as
  $function$
    declare
      table_oid oid;
    begin

      -- Get the table OID
      execute
        $$
          select table_name::regclass::oid
        $$ into table_oid;

      -- Determine if policy exists with correct policy name, operation, role and table
      select exists(
        select * from pg_policy
          where polname = policy_name
          and polrelid = table_oid
      ) into policy_exists;

      -- Throw exception if true (necessary for sqitch)
      if (policy_exists = true) then
        raise exception 'Policy % on table % exists already', policy_name, table_name;
      end if;

      -- Else return true
      return true;
    end;
  $function$
  language 'plpgsql' stable;

  comment on function ggircs_portal_private.verify_policy(text, text, text, text) is 'A generic function for testing the absence of policies on a table';

COMMIT;
