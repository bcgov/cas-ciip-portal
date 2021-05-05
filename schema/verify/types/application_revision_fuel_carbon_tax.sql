-- Verify ggircs-portal:types/application_revision_fuel_carbon_tax on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'application_revision_fuel_carbon_tax'
    ), 'type "application_revision_fuel_carbon_tax" is not defined';
  end;
$$;

rollback;
