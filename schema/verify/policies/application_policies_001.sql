-- Verify ggircs-portal:policies/application_policies_001 on pg

BEGIN;

select ggircs_portal_private.verify_function_not_present('ggircs_portal_private.validate_certifier');
select ggircs_portal_private.verify_policy_not_present('certifier_select_application', 'ggircs_portal.application');

ROLLBACK;
