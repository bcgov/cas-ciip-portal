-- Revert ggircs-portal:policies/application_policies from pg

begin;

drop policy ciip_administrator_select_application on ggircs_portal.application;
drop policy ciip_administrator_insert_application on ggircs_portal.application;
drop policy ciip_administrator_update_application on ggircs_portal.application;

drop policy ciip_analyst_select_application on ggircs_portal.application;
drop policy ciip_analyst_update_application on ggircs_portal.application;

drop policy ciip_industry_user_select_application on ggircs_portal.application;
drop policy ciip_industry_user_insert_application on ggircs_portal.application;

drop policy certifier_select_application on ggircs_portal.application;

drop function ggircs_portal_private.get_valid_application_facilities();
drop function ggircs_portal_private.validate_certifier();

commit;
