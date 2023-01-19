-- Revert ggircs-portal:trigger_functions/user_uuid_immutable_with_flag from pg

begin;

drop function ggircs_portal_private.user_uuid_immutable_with_flag_set;

commit;
