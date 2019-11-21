-- Verify ggircs-portal:function_get_reporting_year on pg

begin;

select pg_get_functiondef('ggircs_portal.get_reporting_year()'::regprocedure);

rollback;
