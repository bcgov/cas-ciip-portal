-- Verify ggircs-portal:queries/default_displayed_reporting_year on pg

begin;

select pg_get_functiondef('ggircs_portal.default_displayed_reporting_year()'::regprocedure);

rollback;
