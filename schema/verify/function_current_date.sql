-- Verify ggircs-portal:function_current_date on pg

begin;

select pg_get_functiondef('ggircs_portal.current_date()'::regprocedure);

rollback;
