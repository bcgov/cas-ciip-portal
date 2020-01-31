-- Verify ggircs-portal:set_general_permissions on pg

begin;
-- TODO: should we verify this file by checking all permissions that are set by set_general_permissions?
select true;

rollback;
