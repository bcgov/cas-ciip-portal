-- Revert ggircs-portal:database_functions/verify_function_not_present from pg

BEGIN;

drop function ggircs_portal_private.verify_function_not_present(text);

COMMIT;
