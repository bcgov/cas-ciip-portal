-- Verify ggircs-portal:policies/emission_category_gas_policies on pg

begin;

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_emission_category_gas', 'emission_category_gas', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_emission_category_gas', 'emission_category_gas', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_emission_category_gas', 'emission_category_gas', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_emission_category_gas', 'emission_category_gas', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_emission_category_gas', 'emission_category_gas', 'ciip_industry_user');

rollback;
