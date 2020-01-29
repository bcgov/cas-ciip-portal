-- Revert ggircs-portal:set_general_permissions from pg

begin;

--TODO: Should we revert all permissions that are set by set_general_permissions here?

commit;
