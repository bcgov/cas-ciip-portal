-- Verify ggircs-portal:type_application_search_result on pg

begin;

do $$
  begin
    if (select true from pg_catalog.pg_type where typname = 'application_search_result') then
      raise 'type "application_search_result" is not defined';
    else
      perform true;
    end if;
  end;
$$;

rollback;
