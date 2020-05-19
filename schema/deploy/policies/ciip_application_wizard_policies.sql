-- Deploy ggircs-portal:policies/ciip_application_wizard_policies to pg
-- requires: tables/ciip_application_wizard

begin;

do
$policy$
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_ciip_application_wizard', 'ciip_application_wizard', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_ciip_application_wizard', 'ciip_application_wizard', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_ciip_application_wizard', 'ciip_application_wizard', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_ciip_application_wizard', 'ciip_application_wizard', 'select', 'ciip_analyst', 'true');

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_ciip_application_wizard', 'ciip_application_wizard', 'select', 'ciip_industry_user', 'true');

end
$policy$;

commit;
