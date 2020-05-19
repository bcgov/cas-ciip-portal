-- Deploy ggircs-portal:policies/form_json_policies to pg
-- requires: tables/form_json

begin;

do
$policy$
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_form_json', 'form_json', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_form_json', 'form_json', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_form_json', 'form_json', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_form_json', 'form_json', 'select', 'ciip_analyst', 'true');

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_form_json', 'form_json', 'select', 'ciip_industry_user', 'true');

end
$policy$;

commit;
