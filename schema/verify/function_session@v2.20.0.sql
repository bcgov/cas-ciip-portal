-- Verify ggircs-portal:function_session on pg

begin;

select pg_get_functiondef('ggircs_portal.session()'::regprocedure);

rollback;
