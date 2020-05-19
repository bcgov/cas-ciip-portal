-- Revert ggircs-portal:policies/ciip_user_policies from pg

begin;

drop policy ciip_administrator_select_ciip_user on ggircs_portal.ciip_user;
drop policy ciip_administrator_insert_ciip_user on ggircs_portal.ciip_user;
drop policy ciip_administrator_update_ciip_user on ggircs_portal.ciip_user;

drop policy ciip_analyst_select_ciip_user on ggircs_portal.ciip_user;
drop policy ciip_analyst_update_ciip_user on ggircs_portal.ciip_user;
drop policy ciip_analyst_update_ciip_user on ggircs_portal.ciip_user;

drop policy ciip_industry_user_select_ciip_user on ggircs_portal.ciip_user;
drop policy ciip_industry_user_insert_ciip_user on ggircs_portal.ciip_user;
drop policy ciip_industry_user_insert_ciip_user on ggircs_portal.ciip_user;

drop policy ciip_gures_select_ciip_user on ggircs_portal.ciip_user;

commit;
