-- Verify ggircs-portal:function_search_all_facilities on pg

begin;

do $$
  begin

    if (select exists(select * from pg_proc where proname='ggircs_portal.search_all_facilities')) then
      raise exception 'ggircs_portal.search_all_facilities exists when it should not';
    else
      perform true;
    end if;

  end;
$$;

rollback;
