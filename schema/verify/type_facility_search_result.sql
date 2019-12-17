-- Verify ggircs-portal:type_facility_search_result on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'facility_search_result'
    ), 'type "facility_search_result" is not defined';
  end;
$$;

rollback;
