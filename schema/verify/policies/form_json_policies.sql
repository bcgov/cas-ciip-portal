-- Verify ggircs-portal:policies/form_json_policies on pg

begin;

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_form_json', 'form_json', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_form_json', 'form_json', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_form_json', 'form_json', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_form_json', 'form_json', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_form_json', 'form_json', 'ciip_industry_user');

rollback;
