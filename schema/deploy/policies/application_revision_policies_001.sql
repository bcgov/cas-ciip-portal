-- Deploy ggircs-portal:policies/application_revision_policies_001 to pg
-- requires: policies/application_revision_policies

BEGIN;

drop policy certifier_select_application_revision on ggircs_portal.application_revision;

COMMIT;
