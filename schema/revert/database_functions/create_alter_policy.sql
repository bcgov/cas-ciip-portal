-- Revert ggircs-portal:database_functions/create_alter_policy from pg

begin;

drop function ggircs_portal.create_alter_policy;

commit;
