-- Deploy ggircs-portal:policies/review_step_name_policies to pg
-- requires: tables/review_step_name

begin;

do
$policy$

begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_review_step', 'review_step_name', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_review_step', 'review_step_name', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_review_step', 'review_step_name', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_review_step', 'review_step_name', 'select', 'ciip_analyst', 'true');
perform ggircs_portal_private.upsert_policy('ciip_analyst_insert_review_step', 'review_step_name', 'insert', 'ciip_analyst', 'true');
perform ggircs_portal_private.upsert_policy('ciip_analyst_update_review_step', 'review_step_name', 'update', 'ciip_analyst', 'true');

end
$policy$;

commit;
