-- Deploy ggircs-portal:policies/certification_url_policies to pg
-- requires: tables/certification_url

begin;

do
$policy$
  declare
    certifier_user_statement text;
  begin

    -- ciip_industry_user (certifier) RLS
    perform ggircs_portal_private.upsert_policy('certifier_select_certification_url', 'certification_url', 'select', 'ciip_industry_user', certifier_user_statement);
    perform ggircs_portal_private.upsert_policy('certifier_update_certification_url', 'certification_url', 'update', 'ciip_industry_user', certifier_user_statement);

  end
$policy$;

commit;
