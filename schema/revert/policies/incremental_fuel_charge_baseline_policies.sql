-- Revert ggircs-portal:policies/incremental_fuel_charge_baseline_policies from pg

begin;

drop policy ciip_administrator_select_baseline on ggircs_portal.incremental_fuel_charge_baseline;
drop policy ciip_administrator_insert_baseline on ggircs_portal.incremental_fuel_charge_baseline;
drop policy ciip_administrator_update_baseline on ggircs_portal.incremental_fuel_charge_baseline;

drop policy ciip_analyst_select_baseline on ggircs_portal.incremental_fuel_charge_baseline;

drop policy ciip_industry_user_select_baseline on ggircs_portal.incremental_fuel_charge_baseline;

commit;