-- Verify ggircs-portal:type_facility_application_status on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'facility_application_status'
    ), 'type "facility_application_status" is not defined';
  end;
$$;

rollback;
