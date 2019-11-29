-- Verify ggircs-portal:view_ciip_carbon_tax_calculation on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.ciip_carbon_tax_calculation', 'select');

rollback;
