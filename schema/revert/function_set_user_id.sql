-- Revert ggircs-portal:function_set_user_id from pg

begin;

drop function ggircs_portal.set_user_id;

commit;
