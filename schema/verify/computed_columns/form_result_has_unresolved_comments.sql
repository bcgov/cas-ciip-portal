-- Verify ggircs-portal:function_form_result_has_unresolved_comments on pg

begin;

do $$
  begin

    if (select exists(select * from pg_proc where proname='ggircs_portal.form_result_has_unresolved_comments')) then
      raise exception 'ggircs_portal.form_result_has_unresolved_comments exists when it should not';
    else
      perform true;
    end if;

  end;
$$;

rollback;
