-- Verify ggircs-portal:types/search_certification_url_result on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'search_certification_url_result'
    ), 'type "search_certification_url_result" is not defined';
  end;
$$;

rollback;
