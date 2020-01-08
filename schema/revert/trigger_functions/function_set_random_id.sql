-- Revert ggircs-portal:function_set_random_id from pg

begin;

drop function ggircs_portal.set_random_id;

commit;
