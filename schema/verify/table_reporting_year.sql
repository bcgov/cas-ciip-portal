-- Verify ggircs-portal:table_reporting_year on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.reporting_year', 'select');

rollback;
