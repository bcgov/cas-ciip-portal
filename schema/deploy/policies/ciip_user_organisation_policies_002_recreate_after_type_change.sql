-- Deploy ggircs-portal:policies/ciip_user_organisation_policies_002_recreate_after_type_change to pg


begin;

do
  $policy$
  begin

    -- ciip_industry_user RLS
    perform ggircs_portal_private.upsert_policy(
      'ciip_industry_user_select_ciip_user_organisation',
      'ciip_user_organisation',
      'select',
      'ciip_industry_user',
      $$user_id=(select id from ggircs_portal.ciip_user where uuid = (select sub from ggircs_portal.session()))$$
    );
    perform ggircs_portal_private.upsert_policy(
        'ciip_industry_user_insert_ciip_user_organisation',
        'ciip_user_organisation',
        'insert',
        'ciip_industry_user',
        $$user_id=(select id from ggircs_portal.ciip_user where uuid = (select sub from ggircs_portal.session())) and status='pending'$$
    );

  end
  $policy$;

commit;
