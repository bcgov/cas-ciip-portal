-- Revert ggircs-portal:function_current_time from pg

begin;

drop function ggircs_portal.current_timestamp;

commit;
