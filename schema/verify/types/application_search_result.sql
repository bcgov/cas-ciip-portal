-- Verify ggircs-portal:type_application_search_result on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'application_search_result'
    ), 'type "application_search_result" is not defined';
  end;
$$;

rollback;
