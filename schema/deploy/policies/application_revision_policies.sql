-- Deploy ggircs-portal:policies/application_revision_policies to pg
-- requires: database_functions/get_valid_applications_for_reporter
-- requires: database_functions/get_valid_applications_for_certifier

BEGIN;

do
$policy$
declare industry_user_statement text;
declare certifier_user_statement text;
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_application_revision', 'application_revision', 'select', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_insert_application_revision', 'application_revision', 'insert', 'ciip_administrator', 'true');
perform ggircs_portal_private.upsert_policy('ciip_administrator_update_application_revision', 'application_revision', 'update', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_application_revision', 'application_revision', 'select', 'ciip_analyst', 'true');

-- statement for select using & insert with check
industry_user_statement := 'application_id in (select ggircs_portal_private.get_valid_applications_for_reporter())';
certifier_user_statement := 'application_id in (select ggircs_portal_private.get_valid_applications_for_certifier())';

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_application_revision', 'application_revision', 'select', 'ciip_industry_user', industry_user_statement);
perform ggircs_portal_private.upsert_policy('ciip_industry_user_insert_application_revision', 'application_revision', 'insert', 'ciip_industry_user', industry_user_statement);
perform ggircs_portal_private.upsert_policy('ciip_industry_user_update_application_revision', 'application_revision', 'update', 'ciip_industry_user', industry_user_statement);

-- ciip_industry_user (certifier) RLS
perform ggircs_portal_private.upsert_policy('certifier_select_application_revision', 'application_revision', 'select', 'ciip_industry_user', certifier_user_statement);

end
$policy$;

COMMIT;
