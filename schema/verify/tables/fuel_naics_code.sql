-- Verify ggircs-portal:tables/fuel_naics_code on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.fuel_naics_code', 'select');

rollback;
