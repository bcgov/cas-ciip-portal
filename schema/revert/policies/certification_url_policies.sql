-- Deploy ggircs-portal:policies/certification_url_policies to pg
-- requires: tables/certification_url

begin;

do
$policy$
  declare
    certifier_user_statement text;
  begin

    certifier_user_statement := 'certifier_email = ((select email_address from ggircs_portal.ciip_user where ciip_user.uuid = (select sub from ggircs_portal.session())))';

    -- ciip_industry_user (certifier) RLS
    perform ggircs_portal_private.upsert_policy('certifier_select_certification_url', 'certification_url', 'select', 'ciip_industry_user', certifier_user_statement);
    perform ggircs_portal_private.upsert_policy('certifier_update_certification_url', 'certification_url', 'update', 'ciip_industry_user', certifier_user_statement);

  end
$policy$;

commit;
