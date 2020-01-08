-- Verify ggircs-portal:table_emission_category_gas on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.emission_category_gas', 'select');

rollback;
