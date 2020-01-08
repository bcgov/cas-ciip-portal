-- Verify ggircs-portal:type_statuses on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'ciip_user_organisation_status'
    ), 'type "ciip_user_organisation_status" is not defined';
  end;
$$;

rollback;
