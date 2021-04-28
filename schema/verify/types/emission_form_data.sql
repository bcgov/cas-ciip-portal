-- Verify ggircs-portal:types/emission_form_data on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'emission_form_data'
    ), 'type "emission_form_data" is not defined';
  end;
$$;

rollback;
