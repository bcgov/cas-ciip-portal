-- Verify ggircs-portal:types/emission_form_result on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'emission_form_result'
    ), 'type "emission_form_result" is not defined';
  end;
$$;

rollback;
