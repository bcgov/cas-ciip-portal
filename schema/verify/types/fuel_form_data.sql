-- Verify ggircs-portal:types/fuel_form_data on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'fuel_form_data'
    ), 'type "fuel_form_data" is not defined';
  end;
$$;

rollback;
