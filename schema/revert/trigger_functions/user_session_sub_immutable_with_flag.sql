-- Revert ggircs-portal:trigger_functions/user_session_sub_immutable_with_flag from pg

begin;

function ggircs_portal_private.user_session_sub_immutable_with_flag_set;

commit;
