-- Verify ggircs-portal:trigger_functions/check_for_immutable_status on pg

begin;

select pg_get_functiondef('ggircs_portal_private.check_for_immutable_status()'::regprocedure);

rollback;
