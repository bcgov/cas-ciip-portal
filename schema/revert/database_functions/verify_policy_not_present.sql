-- Revert ggircs-portal:database_functions/verify_policy_not_present from pg

BEGIN;

drop function ggircs_portal_private.verify_policy_not_present;

COMMIT;
