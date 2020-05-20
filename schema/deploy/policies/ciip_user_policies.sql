-- Deploy ggircs-portal:policies/ciip_user_policies to pg
-- requires: tables/ciip_user

begin;

do
$policy$
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_ciip_user', 'ciip_user', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_ciip_user', 'ciip_user', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_ciip_user', 'ciip_user', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_ciip_user', 'ciip_user', 'select', 'ciip_analyst', 'true');
perform ggircs_portal_private.upsert_policy('ciip_analyst_insert_ciip_user', 'ciip_user', 'insert', 'ciip_analyst', 'uuid=(select sub from ggircs_portal.session())');
perform ggircs_portal_private.upsert_policy('ciip_analyst_update_ciip_user', 'ciip_user', 'update', 'ciip_analyst', 'uuid=(select sub from ggircs_portal.session())');

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_ciip_user', 'ciip_user', 'select', 'ciip_industry_user', 'uuid=(select sub from ggircs_portal.session())');
perform ggircs_portal_private.upsert_policy('ciip_industry_user_insert_ciip_user', 'ciip_user', 'insert', 'ciip_industry_user', 'uuid=(select sub from ggircs_portal.session())');
perform ggircs_portal_private.upsert_policy('ciip_industry_user_update_ciip_user', 'ciip_user', 'update', 'ciip_industry_user', 'uuid=(select sub from ggircs_portal.session())');

-- ciip_guest RLS
perform ggircs_portal_private.upsert_policy('ciip_guest_select_ciip_user', 'ciip_user', 'select', 'ciip_guest', 'uuid=(select sub from ggircs_portal.session())');

end
$policy$;

commit;
