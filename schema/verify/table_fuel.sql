-- Verify ggircs-portal:table_fuel on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.fuel', 'select');

rollback;
