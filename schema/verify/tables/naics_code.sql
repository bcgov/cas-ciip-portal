-- Verify ggircs-portal:tables/naics_code on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.naics_code', 'select');

rollback;
