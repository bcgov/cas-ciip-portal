-- Verify ggircs-portal:tables/incremental_fuel_charge_baseline_001 on pg

begin;

select pg_catalog.has_table_privilege('ggircs_portal.incremental_fuel_charge_baseline', 'select');

-- ciip_administrator Grants
select ggircs_portal_private.verify_grant('select', 'incremental_fuel_charge_baseline', 'ciip_administrator');

-- ciip_analyst Grants
select ggircs_portal_private.verify_grant('select', 'incremental_fuel_charge_baseline', 'ciip_analyst');

-- ciip_industry_user Grants
select ggircs_portal_private.verify_grant('select', 'incremental_fuel_charge_baseline', 'ciip_industry_user');

rollback;
