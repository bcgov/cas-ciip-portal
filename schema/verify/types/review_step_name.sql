-- Verify ggircs-portal:types/review_step_name on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'review_step_name'
    ), 'type "review_step_name" is not defined';
  end;
$$;

rollback;
