-- Deploy ggircs-portal:policies/application_policies_001 to pg
-- requires: policies/application_policies

BEGIN;

drop policy certifier_select_application on ggircs_portal.application;
drop function ggircs_portal_private.validate_certifier;

COMMIT;
