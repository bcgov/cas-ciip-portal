-- Deploy ggircs-portal:policies/ciip_user_organisation_policies to pg
-- requires: tables/ciip_user_organisation

begin;

do
  $policy$
  begin
    -- ciip_administrator RLS
    perform ggircs_portal_private.upsert_policy('ciip_administrator_select_ciip_user_organisation', 'ciip_user_organisation', 'select', 'ciip_administrator', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_ciip_user_organisation', 'ciip_user_organisation', 'insert', 'ciip_administrator', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_administrator_update_ciip_user_organisation', 'ciip_user_organisation', 'update', 'ciip_administrator', 'true');

    -- ciip_analyst RLS
    perform ggircs_portal_private.upsert_policy('ciip_analyst_select_ciip_user_organisation', 'ciip_user_organisation', 'select', 'ciip_analyst', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_analyst_insert_ciip_user_organisation', 'ciip_user_organisation', 'insert', 'ciip_analyst', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_analyst_update_ciip_user_organisation', 'ciip_user_organisation', 'update', 'ciip_analyst', 'true');

    -- ciip_industry_user RLS
    perform ggircs_portal_private.upsert_policy(
      'ciip_industry_user_select_ciip_user_organisation',
      'ciip_user_organisation',
      'select',
      'ciip_industry_user',
      $$user_id=(select id from ggircs_portal.ciip_user where uuid = (select sub from ggircs_portal.session()))$$
    );
    perform ggircs_portal_private.upsert_policy('ciip_industry_user_insert_ciip_user_organisation', 'ciip_user_organisation', 'insert', 'ciip_industry_user', $$user_id=(select id from ggircs_portal.ciip_user where uuid = (select sub from ggircs_portal.session())) and status='pending'$$);

  end
  $policy$;

commit;
