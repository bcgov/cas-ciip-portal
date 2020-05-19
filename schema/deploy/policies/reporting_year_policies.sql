-- Deploy ggircs-portal:policies/reporting_year_policies to pg
-- requires: tables/reporting_year

begin;

do
$policy$
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_reporting_year', 'reporting_year', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_reporting_year', 'reporting_year', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_reporting_year', 'reporting_year', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_reporting_year', 'reporting_year', 'select', 'ciip_analyst', 'true');

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_reporting_year', 'reporting_year', 'select', 'ciip_industry_user', 'true');

-- ciip_guest RLS
perform ggircs_portal_private.upsert_policy('ciip_guest_select_reporting_year', 'reporting_year', 'select', 'ciip_guest', 'true');

end
$policy$;

commit;
