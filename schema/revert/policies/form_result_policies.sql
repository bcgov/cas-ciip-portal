-- Revert ggircs-portal:policies/form_result_policies from pg

begin;

drop policy ciip_administrator_select_form_result on ggircs_portal.form_result;

drop policy ciip_analyst_select_form_result on ggircs_portal.form_result;

drop policy ciip_industry_user_select_form_result on ggircs_portal.form_result;
drop policy ciip_industry_user_insert_form_result on ggircs_portal.form_result;
drop policy ciip_industry_user_update_form_result on ggircs_portal.form_result;

drop policy certifier_select_form_result on ggircs_portal.form_result;

commit;
