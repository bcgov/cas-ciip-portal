-- Verify ggircs-portal:function_current_time on pg

begin;

select pg_get_functiondef('ggircs_portal.current_timestamp()'::regprocedure);

rollback;
