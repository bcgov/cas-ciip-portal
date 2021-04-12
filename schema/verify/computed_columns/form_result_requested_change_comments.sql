-- Verify ggircs-portal:computer_columns/form_result_requested_change_comments on pg

begin;

do $$
  begin

    if (select exists(select * from pg_proc where proname='ggircs_portal.form_result_requested_change_comments')) then
      raise exception 'ggircs_portal.form_result_requested_change_comments exists when it should not';
    else
      perform true;
    end if;

  end;
$$;

rollback;
