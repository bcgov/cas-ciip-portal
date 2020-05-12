-- Revert ggircs-portal:policies/certification_url_policies from pg

begin;

-- ciip_administrator Policies
drop policy ciip_administrator_select_certification_url on ggircs_portal.certification_url;
drop policy ciip_administrator_insert_certification_url on ggircs_portal.certification_url;

-- ciip_analyst Policies
drop policy ciip_analyst_select_certification_url on ggircs_portal.certification_url;

-- ciip_industry_user Policies
drop policy ciip_industry_user_select_certification_url on ggircs_portal.certification_url;
drop policy ciip_industry_user_insert_certification_url on ggircs_portal.certification_url;
drop policy ciip_industry_user_update_certification_url on ggircs_portal.certification_url;

-- ciip_industry_user (certifier) Policies
drop policy certifier_select_certification_url on ggircs_portal.certification_url;
drop policy certifier_update_certification_url on ggircs_portal.certification_url;

commit;
