-- Verify ggircs-portal:function_current_time on pg

BEGIN;

do $$
begin

  if (select count(*) from information_schema.routines where specific_schema='ggircs_portal' and routine_name='current_timestamp') <> 0 then
    raise 'ggircs_portal.current_timestamp() still exists';
  end if;

end $$;

ROLLBACK;
