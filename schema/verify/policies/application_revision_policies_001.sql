-- Verify ggircs-portal:policies/application_revision_policies_001 on pg

BEGIN;

select ggircs_portal_private.verify_policy_not_present('certifier_select_application_revision', 'ggircs_portal.application_revision');

ROLLBACK;
