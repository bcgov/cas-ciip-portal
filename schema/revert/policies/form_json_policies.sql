-- Revert ggircs-portal:policies/form_json_policies from pg

begin;

drop policy ciip_administrator_select_form_json on ggircs_portal.form_json;
drop policy ciip_administrator_insert_form_json on ggircs_portal.form_json;
drop policy ciip_administrator_update_form_json on ggircs_portal.form_json;

drop policy ciip_analyst_select_form_json on ggircs_portal.form_json;

drop policy ciip_industry_user_select_form_json on ggircs_portal.form_json;

commit;
