-- Verify ggircs-portal:function_search_products on pg

begin;

do $$
  begin

    if (select exists(select * from pg_proc where proname='ggircs_portal.search_products')) then
      raise exception 'ggircs_portal.search_products exists when it should not';
    else
      perform true;
    end if;

  end; $$;

rollback;
