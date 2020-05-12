-- Deploy ggircs-portal:policies/certification_url_policies to pg
-- requires: tables/certification_url

begin;

do
$policy$
  declare
    industry_user_statement text;
    certifier_user_statement text;
  begin
    -- ciip_administrator RLS
    perform ggircs_portal_private.upsert_policy('ciip_administrator_select_certification_url', 'certification_url', 'select', 'ciip_administrator', 'true');
    perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_certification_url', 'certification_url', 'insert', 'ciip_administrator', 'true');

    -- ciip_analyst RLS
    perform ggircs_portal_private.upsert_policy('ciip_analyst_select_certification_url', 'certification_url', 'select', 'ciip_analyst', 'true');

    -- statement for select using & insert with check
    industry_user_statement := 'application_id in (select ggircs_portal_private.get_valid_applications_for_reporter())';
    certifier_user_statement := 'certifier_email = ((select email_address from ggircs_portal.ciip_user where ciip_user.uuid = (select sub from ggircs_portal.session())))';

    -- ciip_industry_user RLS
    perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_certification_url', 'certification_url', 'select', 'ciip_industry_user', industry_user_statement);
    perform ggircs_portal_private.upsert_policy('ciip_industry_user_insert_certification_url', 'certification_url', 'insert', 'ciip_industry_user', industry_user_statement);
    perform ggircs_portal_private.upsert_policy('ciip_industry_user_update_certification_url', 'certification_url', 'update', 'ciip_industry_user', industry_user_statement);

    -- ciip_industry_user (certifier) RLS
    perform ggircs_portal_private.upsert_policy('certifier_select_certification_url', 'certification_url', 'select', 'ciip_industry_user', certifier_user_statement);
    perform ggircs_portal_private.upsert_policy('certifier_update_certification_url', 'certification_url', 'update', 'ciip_industry_user', certifier_user_statement);

  end
$policy$;

commit;
