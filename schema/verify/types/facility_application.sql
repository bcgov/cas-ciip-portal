-- Verify ggircs-portal:types/facility_application on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'facility_application'
    ), 'type "facility_application" is not defined';
  end;
$$;

rollback;
