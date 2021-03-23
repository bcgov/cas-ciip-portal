-- Deploy ggircs-portal:database_functions/verify_function_not_present to pg

BEGIN;

create or replace function ggircs_portal_private.verify_function_not_present(function_name text)
returns boolean
as
$function$

  begin

    if (select exists(select * from pg_proc where proname=function_name)) then
      raise exception '% exists when it should not', function_name;
    else
      return true;
    end if;

  end;

$function$
language 'plpgsql' stable;

COMMIT;
