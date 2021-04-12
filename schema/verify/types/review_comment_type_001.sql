-- Verify ggircs-portal:review_comment_type_001 on pg

begin;

do $$
  begin
    assert (
      select true from pg_catalog.pg_type where typname = 'review_comment_type'
    ), 'type "review_comment_type" is not defined';
  end;
$$;

rollback;
