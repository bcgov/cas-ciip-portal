-- Verify ggircs-portal:tables/form_result_status on pg

begin;

do $$
  begin

    if (select exists (
    select from information_schema.tables
    where table_schema = 'ggircs_portal'
    and table_name = 'form_result_status'
   )) then
      raise exception 'ggircs_portal.form_result_status exists when it should not';
    else
      perform true;
    end if;

  end; $$;

rollback;
