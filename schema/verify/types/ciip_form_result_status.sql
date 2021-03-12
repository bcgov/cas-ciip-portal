-- Verify ggircs-portal:types/ciip_form_result_status on pg

begin;

do $$
  begin

    if (select exists(select * from pg_catalog.pg_type where typname = 'ciip_form_result_status')) then
      raise exception 'ggircs_portal.search_application_list exists when it should not';
    else
      perform true;
    end if;

  end; $$;

rollback;
