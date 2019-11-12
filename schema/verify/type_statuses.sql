-- Verify ggircs-portal:type_statuses on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'statuses'
    ), 'type "statuses" is not defined';
  end;
$$;

rollback;
