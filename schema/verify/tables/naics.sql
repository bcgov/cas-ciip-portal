-- Verify ggircs-portal:tables/naics on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.naics', 'select');

rollback;
