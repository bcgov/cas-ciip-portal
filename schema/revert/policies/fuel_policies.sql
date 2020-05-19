-- Revert ggircs-portal:policies/fuel_policies from pg

begin;

drop policy ciip_administrator_select_fuel on ggircs_portal.fuel;
drop policy ciip_administrator_insert_fuel on ggircs_portal.fuel;
drop policy ciip_administrator_update_fuel on ggircs_portal.fuel;

drop policy ciip_analyst_select_fuel on ggircs_portal.fuel;

drop policy ciip_industry_user_select_fuel on ggircs_portal.fuel;

commit;
