-- Deploy ggircs-portal:policies/application_revision_status_policies_001 to pg
-- requires: policies/application_revision_status_policies

BEGIN;

drop policy certifier_select_application_revision_status on ggircs_portal.application_revision_status;

COMMIT;
