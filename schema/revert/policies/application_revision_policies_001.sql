-- Revert ggircs-portal:policies/application_revision_policies_001 from pg

BEGIN;

do
$policy$
declare certifier_user_statement text;
begin

certifier_user_statement := 'application_id in (select ggircs_portal_private.get_valid_applications_for_certifier())';

-- ciip_industry_user (certifier) RLS
perform ggircs_portal_private.upsert_policy('certifier_select_application_revision', 'application_revision', 'select', 'ciip_industry_user', certifier_user_statement);

end
$policy$;

COMMIT;
