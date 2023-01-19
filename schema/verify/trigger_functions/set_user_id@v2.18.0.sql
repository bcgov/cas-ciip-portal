-- Verify ggircs-portal:function_set_user_id on pg

begin;

select pg_get_functiondef('ggircs_portal_private.set_user_id()'::regprocedure);

rollback;
