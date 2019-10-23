-- Verify ggircs-portal:table_facility on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.facility', 'select');

rollback;
