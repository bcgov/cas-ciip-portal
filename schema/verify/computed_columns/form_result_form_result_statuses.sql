-- Verify ggircs-portal:computed_columns/form_result_form_result_statuses on pg

begin;

do $$
  begin

    if (select exists(select * from pg_proc where proname='ggircs_portal.form_result_form_result_statuses')) then
      raise exception 'ggircs_portal.form_result_form_result_statuses exists when it should not';
    else
      perform true;
    end if;

  end; $$;

rollback;
