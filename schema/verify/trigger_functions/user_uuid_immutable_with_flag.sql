-- Verify ggircs-portal:trigger_functions/user_uuid_immutable_with_flag on pg

begin;

select pg_get_functiondef('ggircs_portal_private.user_uuid_immutable_with_flag_set()'::regprocedure);

rollback;
