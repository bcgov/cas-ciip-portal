-- Deploy ggircs-portal:policies/incremental_fuel_charge_baseline_policies to pg
-- requires: tables/incremental_fuel_charge_baseline

begin;

do
$policy$
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_baseline', 'incremental_fuel_charge_baseline', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_baseline', 'incremental_fuel_charge_baseline', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_baseline', 'incremental_fuel_charge_baseline', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_baseline', 'incremental_fuel_charge_baseline', 'select', 'ciip_analyst', 'true');

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_baseline', 'incremental_fuel_charge_baseline', 'select', 'ciip_industry_user', 'true');

end
$policy$;

commit;
