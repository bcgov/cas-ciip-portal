-- Deploy ggircs-portal:policies/naics_policies to pg
-- requires: tables/naics

begin;

do
$policy$

begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_naics', 'naics', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_naics', 'naics', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_naics', 'naics', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_naics', 'naics', 'select', 'ciip_analyst', 'true');

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_naics', 'naics', 'select', 'ciip_industry_user', 'true');

end
$policy$;

commit;
