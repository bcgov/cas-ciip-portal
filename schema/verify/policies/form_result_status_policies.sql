-- Verify ggircs-portal:policies/form_result_status_policies on pg

begin;

do $$
  begin

    if (select exists(select * from pg_proc where proname='ggircs_portal_private.get_valid_form_result_status_applications')) then
      raise exception 'ggircs_portal_private.get_valid_form_result_status_applications exists when it should not';
    else
      perform true;
    end if;

  end; $$;

rollback;
