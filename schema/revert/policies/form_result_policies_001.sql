-- Revert ggircs-portal:policies/form_result_policies_001 from pg

BEGIN;

do
$policy$
declare certifier_user_statement text;
BEGIN

certifier_user_statement := 'application_id in (select ggircs_portal_private.get_valid_applications_for_certifier())' ;

-- ciip_industry_user (certifier) RLS
perform ggircs_portal_private.upsert_policy('certifier_select_form_result', 'form_result', 'select', 'ciip_industry_user', certifier_user_statement);

end
$policy$;

COMMIT;
