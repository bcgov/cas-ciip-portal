-- Verify ggircs-portal:next_reporting_year on pg

begin;

select pg_get_functiondef('ggircs_portal.next_reporting_year()'::regprocedure);

rollback;
