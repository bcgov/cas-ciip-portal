-- Deploy ggircs-portal:policies/linked_product_policies to pg
-- requires: tables/linked_product

begin;

do
  $policy$
  begin
    -- ciip_administrator RLS
    perform ggircs_portal_private.upsert_policy('ciip_administrator_select_linked_product', 'linked_product', 'select', 'ciip_administrator', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_linked_product', 'linked_product', 'insert', 'ciip_administrator', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_administrator_update_linked_product', 'linked_product', 'update', 'ciip_administrator', 'true');

    -- ciip_analyst RLS
    perform ggircs_portal_private.upsert_policy('ciip_analyst_select_linked_product', 'linked_product', 'select', 'ciip_analyst', 'true');

    -- ciip_industry_user RLS
    perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_linked_product', 'linked_product', 'select', 'ciip_industry_user', 'true');

  end
  $policy$;

commit;
