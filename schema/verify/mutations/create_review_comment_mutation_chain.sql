-- Verify ggircs-portal:mutations/create_review_comment_mutation_chain on pg

begin;

do $$
  begin

    if (select exists(select * from pg_proc where proname='ggircs_portal.create_review_comment_mutation_chain')) then
      raise exception 'ggircs_portal.create_review_comment_mutation_chain exists when it should not';
    else
      perform true;
    end if;

  end;
$$;

rollback;
