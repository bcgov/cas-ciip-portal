-- Revert ggircs-portal:function_create_application_status from pg

BEGIN;

drop function ggircs_portal.create_application_status;

COMMIT;
