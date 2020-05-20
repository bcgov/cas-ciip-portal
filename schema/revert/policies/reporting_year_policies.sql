-- Revert ggircs-portal:policies/reporting_year_policies from pg

begin;

drop policy ciip_administrator_select_reporting_year on ggircs_portal.reporting_year;
drop policy ciip_administrator_insert_reporting_year on ggircs_portal.reporting_year;
drop policy ciip_administrator_update_reporting_year on ggircs_portal.reporting_year;

drop policy ciip_analyst_select_reporting_year on ggircs_portal.reporting_year;

drop policy ciip_industry_user_select_reporting_year on ggircs_portal.reporting_year;

drop policy ciip_guest_select_reporting_year on ggircs_portal.reporting_year;

commit;
