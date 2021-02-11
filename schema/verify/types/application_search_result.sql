-- Verify ggircs-portal:type_application_search_result on pg

begin;

do $$
  begin

    if (select exists (select * from pg_catalog.pg_type where typname = 'application_search_result')) then
      raise exception 'Type: application_search_result" exists when it should not';
    else
      perform true;
    end if;

  end;
$$;

rollback;
