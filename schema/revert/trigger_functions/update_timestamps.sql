-- Revert ggircs-portal:function_update_timestamps from pg

begin;

drop function ggircs_portal_private.update_timestamps;

commit;
