-- Verify ggircs-portal:policies/application_revision_status_policies_001 on pg

BEGIN;

select ggircs_portal_private.verify_policy_not_present('certifier_select_application_revision_status', 'ggircs_portal.application_revision_status');

ROLLBACK;
