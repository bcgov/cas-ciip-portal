-- Revert ggircs-portal:function_set_user_id from pg

begin;

drop function ggircs_portal_private.set_user_id;

commit;
