-- Revert ggircs-portal:policies/naics_policies from pg

begin;

drop policy ciip_administrator_select_naics on ggircs_portal.naics;
drop policy ciip_administrator_insert_naics on ggircs_portal.naics;
drop policy ciip_administrator_update_naics on ggircs_portal.naics;

drop policy ciip_analyst_select_naics on ggircs_portal.naics;

drop policy ciip_industry_user_select_naics on ggircs_portal.naics;

commit;
