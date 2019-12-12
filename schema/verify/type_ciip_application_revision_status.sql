-- Verify ggircs-portal:type_ciip_application_status on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'ciip_application_revision_status'
    ), 'type "ciip_application_status" is not defined';
  end;
$$;

rollback;
