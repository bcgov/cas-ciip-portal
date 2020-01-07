-- Revert ggircs-portal:function_current_date from pg

begin;

drop function ggircs_portal.current_date;

commit;
