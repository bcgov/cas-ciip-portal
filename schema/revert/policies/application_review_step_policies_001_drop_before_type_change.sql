-- Revert ggircs-portal:policies/application_review_step_policies_001_drop_before_type_change from pg

begin;

do
$policy$
declare
  industry_user_statement text;

begin

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
