-- Deploy ggircs-portal:policies/emission_category_gas_policies to pg
-- requires: tables/emission_category_gas

begin;

do
$policy$
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_emission_category_gas', 'emission_category_gas', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_emission_category_gas', 'emission_category_gas', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_emission_category_gas', 'emission_category_gas', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_emission_category_gas', 'emission_category_gas', 'select', 'ciip_analyst', 'true');

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_emission_category_gas', 'emission_category_gas', 'select', 'ciip_industry_user', 'true');

end
$policy$;

commit;
