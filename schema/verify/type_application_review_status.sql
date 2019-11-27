-- Verify ggircs-portal:type_application_review_status on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'application_review_status'
    ), 'type "application_review_status" is not defined';
  end;
$$;

rollback;
