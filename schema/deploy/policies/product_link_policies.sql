-- Deploy ggircs-portal:policies/product_link_policies to pg
-- requires: tables/product_link

begin;

do
  $policy$
  begin
    -- ciip_administrator RLS
    perform ggircs_portal_private.upsert_policy('ciip_administrator_select_product_link', 'product_link', 'select', 'ciip_administrator', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_product_link', 'product_link', 'insert', 'ciip_administrator', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_administrator_update_product_link', 'product_link', 'update', 'ciip_administrator', 'true');

    -- ciip_analyst RLS
    perform ggircs_portal_private.upsert_policy('ciip_analyst_select_product_link', 'product_link', 'select', 'ciip_analyst', 'true');

    -- ciip_industry_user RLS
    perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_product_link', 'product_link', 'select', 'ciip_industry_user', 'true');

  end
  $policy$;

commit;
