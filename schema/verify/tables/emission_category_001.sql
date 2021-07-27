-- Verify ggircs-portal:tables/emission_category_001 on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.emission_category', 'select');

rollback;
