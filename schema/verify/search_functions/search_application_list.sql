-- Verify ggircs-portal:function_search_application_list on pg

begin;

do $$
begin

  if (select exists(select * from pg_proc where proname='ggircs_portal.search_application_list')) then
    raise exception 'ggircs_portal.search_application_list exists when it should not';
  else
    perform true;
  end if;

end; $$;

rollback;
