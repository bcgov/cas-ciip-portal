-- Verify ggircs-portal:policies/form_result_policies on pg

begin;

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_form_result', 'form_result', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_form_result', 'form_result', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_form_result', 'form_result', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('insert', 'ciip_industry_user_insert_form_result', 'form_result', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('update', 'ciip_industry_user_update_form_result', 'form_result', 'ciip_industry_user');

-- ciip_industry_user (certifier) Policies
select ggircs_portal_private.verify_policy('select', 'certifier_select_form_result', 'form_result', 'ciip_industry_user');

-- ciip_guest Policies

rollback;
