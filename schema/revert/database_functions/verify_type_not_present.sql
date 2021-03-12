-- Revert ggircs-portal:database_functions/verify_type_not_present from pg

BEGIN;

drop function ggircs_portal_private.verify_type_not_present;

COMMIT;
