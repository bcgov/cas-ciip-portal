-- Verify ggircs-portal:function_search_organisation_facilities on pg

begin;

do $$
  begin

    if (select exists(select * from pg_proc where proname='ggircs_portal.search_organisation_facilities')) then
      raise exception 'ggircs_portal.search_organisation_facilities exists when it should not';
    else
      perform true;
    end if;

  end; $$;

rollback;
