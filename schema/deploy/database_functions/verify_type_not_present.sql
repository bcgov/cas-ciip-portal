-- Deploy ggircs-portal:database_functions/verify_type_not_present to pg

BEGIN;

create or replace function ggircs_portal_private.verify_type_not_present(name_of_type text)
returns boolean
as
$function$

  begin

    if (select exists(select * from pg_catalog.pg_type where typname = name_of_type)) then
      raise exception '% type exists when it should not', name_of_type;
    else
      return true;
    end if;

  end;

$function$
language 'plpgsql' stable;

COMMIT;
