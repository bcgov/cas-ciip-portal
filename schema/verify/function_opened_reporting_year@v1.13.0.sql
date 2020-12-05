-- Verify ggircs-portal:opened_reporting_year on pg

begin;

select pg_get_functiondef('ggircs_portal.opened_reporting_year()'::regprocedure);

rollback;
