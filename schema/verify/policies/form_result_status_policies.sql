-- Verify ggircs-portal:policies/form_result_status_policies on pg

begin;

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_form_result_status', 'form_result_status', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_form_result_status', 'form_result_status', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_form_result_status', 'form_result_status', 'ciip_analyst');
select ggircs_portal_private.verify_policy('insert', 'ciip_analyst_insert_form_result_status', 'form_result_status', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_form_result_status', 'form_result_status', 'ciip_industry_user');
select ggircs_portal_private.verify_policy('insert', 'ciip_industry_user_insert_form_result_status', 'form_result_status', 'ciip_industry_user');

rollback;
