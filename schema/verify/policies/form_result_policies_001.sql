-- Verify ggircs-portal:policies/form_result_policies_001 on pg

BEGIN;

select ggircs_portal_private.verify_policy_not_present('certifier_select_form_result', 'ggircs_portal.form_result');

ROLLBACK;
