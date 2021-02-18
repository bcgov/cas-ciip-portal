-- Verify ggircs-portal:function_search_ciip_user_organisation on pg

begin;

do $$
  begin

    if (select exists(select * from pg_proc where proname='ggircs_portal.search_ciip_user_organisation')) then
      raise exception 'ggircs_portal.search_ciip_user_organisation exists when it should not';
    else
      perform true;
    end if;

  end; $$;

rollback;
