-- Revert ggircs-portal:function_update_timestamps from pg

begin;

drop function ggircs_portal.function_update_timestamps;

commit;
