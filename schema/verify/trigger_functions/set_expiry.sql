-- Verify ggircs-portal:function_set_expiry on pg

begin;

select pg_get_functiondef('ggircs_portal_private.set_expiry()'::regprocedure);

rollback;
