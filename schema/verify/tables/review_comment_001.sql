-- Verify ggircs-portal:tables/review_comment_001 on pg

begin;

do $$
  begin

    if (select exists(select * from information_schema.columns
        where table_schema='ggircs_portal'
        and table_name='review_comment'
        and column_name='form_id')) then
      raise exception 'form_id column exists on review_comment table when it should not';
    else
      perform true;
    end if;

  end;
$$;

rollback;
