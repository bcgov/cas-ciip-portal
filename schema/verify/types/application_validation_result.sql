-- Verify ggircs-portal:types/application_validation_result on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'application_validation_result'
    ), 'type "application_validation_result" is not defined';
  end;
$$;

rollback;
