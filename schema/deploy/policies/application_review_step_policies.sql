-- Deploy ggircs-portal:policies/review_step_policies to pg
-- requires: tables/application_review_step

begin;

do
$policy$
declare
  industry_user_statement text;

begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_review_step', 'application_review_step', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_review_step', 'application_review_step', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_review_step', 'application_review_step', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_review_step', 'application_review_step', 'select', 'ciip_analyst', 'true');
perform ggircs_portal_private.upsert_policy('ciip_analyst_insert_review_step', 'application_review_step', 'insert', 'ciip_analyst', 'true');
perform ggircs_portal_private.upsert_policy('ciip_analyst_update_review_step', 'application_review_step', 'update', 'ciip_analyst', 'true');

industry_user_statement = $$
  application_id in (
    select a.id from ggircs_portal.application a
    join ggircs_portal.facility f
      on a.facility_id = f.id
    join ggircs_portal.ciip_user_organisation cuo
      on f.organisation_id = cuo.organisation_id
    join ggircs_portal.ciip_user cu
      on cuo.user_id = cu.id
      and cu.uuid = (select sub from ggircs_portal.session())
  )
$$;

perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_application_review_step', 'application_review_step', 'select', 'ciip_industry_user', industry_user_statement);

end
$policy$;

commit;
