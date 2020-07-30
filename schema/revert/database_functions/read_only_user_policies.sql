-- Revert ggircs-portal:database_functions/read_only_user_policies from pg

begin;

drop function if exists ggircs_portal_private.read_only_user_policies;

commit;
