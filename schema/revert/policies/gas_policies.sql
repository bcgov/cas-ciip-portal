-- Revert ggircs-portal:policies/gas_policies from pg

begin;

drop policy ciip_administrator_select_gas on ggircs_portal.gas;
drop policy ciip_administrator_insert_gas on ggircs_portal.gas;
drop policy ciip_administrator_update_gas on ggircs_portal.gas;

drop policy ciip_analyst_select_gas on ggircs_portal.gas;

drop policy ciip_industry_user_select_gas on ggircs_portal.gas;

commit;
