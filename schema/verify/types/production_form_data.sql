-- Verify ggircs-portal:types/production_form_data on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'production_form_data'
    ), 'type "production_form_data" is not defined';
  end;
$$;

rollback;
