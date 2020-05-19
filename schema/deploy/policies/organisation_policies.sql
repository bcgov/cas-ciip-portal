-- Deploy ggircs-portal:policies/organisation_policies to pg
-- requires: tables/organisation

begin;

do
  $policy$
  begin
    -- ciip_administrator RLS
    perform ggircs_portal_private.upsert_policy('ciip_administrator_select_organisation', 'organisation', 'select', 'ciip_administrator', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_organisation', 'organisation', 'insert', 'ciip_administrator', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_administrator_update_organisation', 'organisation', 'update', 'ciip_administrator', 'true');

    -- ciip_analyst RLS
    perform ggircs_portal_private.upsert_policy('ciip_analyst_select_organisation', 'organisation', 'select', 'ciip_analyst', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_analyst_insert_organisation', 'organisation', 'insert', 'ciip_analyst', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_analyst_update_organisation', 'organisation', 'update', 'ciip_analyst', 'true');

    -- ciip_industry_user RLS
    perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_organisation', 'organisation', 'select', 'ciip_industry_user', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_industry_user_insert_organisation', 'organisation', 'insert', 'ciip_industry_user', 'true');

  end
  $policy$;

commit;
