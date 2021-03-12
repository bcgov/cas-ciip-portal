-- Deploy ggircs-portal:policies/review_step_name_policies to pg
-- requires: tables/review_step

begin;

do
$policy$

begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_review_step', 'review_step', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_review_step', 'review_step', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_review_step', 'review_step', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_review_step', 'review_step', 'select', 'ciip_analyst', 'true');

end
$policy$;

commit;
