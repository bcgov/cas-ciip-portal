-- Verify ggircs-portal:policies/reporting_year_policies on pg

begin;

-- ciip_administrator Policies
select ggircs_portal_private.verify_policy('select', 'ciip_administrator_select_reporting_year', 'reporting_year', 'ciip_administrator');
select ggircs_portal_private.verify_policy('insert', 'ciip_administrator_insert_reporting_year', 'reporting_year', 'ciip_administrator');
select ggircs_portal_private.verify_policy('update', 'ciip_administrator_update_reporting_year', 'reporting_year', 'ciip_administrator');

-- ciip_analyst Policies
select ggircs_portal_private.verify_policy('select', 'ciip_analyst_select_reporting_year', 'reporting_year', 'ciip_analyst');

-- ciip_industry_user Policies
select ggircs_portal_private.verify_policy('select', 'ciip_industry_user_select_reporting_year', 'reporting_year', 'ciip_industry_user');

-- ciip_guest Policies
select ggircs_portal_private.verify_policy('select', 'ciip_guest_select_reporting_year', 'reporting_year', 'ciip_guest');

rollback;
