-- Deploy ggircs-portal:policies/form_result_policies to pg
-- requires: database_functions/get_valid_applications_for_reporter
-- requires: database_functions/get_valid_applications_for_certifier

begin;

do
$policy$
declare industry_user_statement text;
declare certifier_user_statement text;
begin
-- ciip_administrator RLS
perform ggircs_portal_private.upsert_policy('ciip_administrator_select_form_result', 'form_result', 'select', 'ciip_administrator', 'true');

-- ciip_analyst RLS
perform ggircs_portal_private.upsert_policy('ciip_analyst_select_form_result', 'form_result', 'select', 'ciip_analyst', 'true');

-- statement for select using & insert with check
industry_user_statement := 'application_id in (select ggircs_portal_private.get_valid_applications_for_reporter())' ;
certfier_user_statement := 'application_id in (select ggircs_portal_private.get_valid_applications_for_certifier())' ;

-- ciip_industry_user RLS
perform ggircs_portal_private.upsert_policy('ciip_industry_user_select_form_result', 'form_result', 'select', 'ciip_industry_user', industry_user_statement);
perform ggircs_portal_private.upsert_policy('ciip_industry_user_insert_form_result', 'form_result', 'insert', 'ciip_industry_user', industry_user_statement);
perform ggircs_portal_private.upsert_policy('ciip_industry_user_update_form_result', 'form_result', 'update', 'ciip_industry_user', industry_user_statement);

-- ciip_industry_user (certifier) RLS
perform ggircs_portal_private.upsert_policy('certifier_select_form_result', 'form_result', 'select', 'ciip_industry_user', certifier_user_statement);

end
$policy$;

commit;
