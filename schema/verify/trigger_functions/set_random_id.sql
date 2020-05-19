-- Verify ggircs-portal:function_set_random_id on pg

begin;

select pg_get_functiondef('ggircs_portal_private.set_random_id()'::regprocedure);

rollback;
