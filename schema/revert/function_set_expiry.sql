-- Revert ggircs-portal:function_set_expiry from pg

begin;

drop function ggircs_portal.set_expiry;

commit;
