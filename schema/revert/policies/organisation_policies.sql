-- Revert ggircs-portal:policies/organisation_policies from pg

begin;

drop policy ciip_administrator_select_organisation on ggircs_portal.organisation;
drop policy ciip_administrator_insert_organisation on ggircs_portal.organisation;
drop policy ciip_administrator_update_organisation on ggircs_portal.organisation;

drop policy ciip_analyst_select_organisation on ggircs_portal.organisation;
drop policy ciip_analyst_update_organisation on ggircs_portal.organisation;
drop policy ciip_analyst_insert_organisation on ggircs_portal.organisation;

drop policy ciip_industry_user_select_organisation on ggircs_portal.organisation;
drop policy ciip_industry_user_insert_organisation on ggircs_portal.organisation;

commit;
